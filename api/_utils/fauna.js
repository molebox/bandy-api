const {faunaUserKey} = require('./config');
const fetch = require('isomorphic-fetch');
const faunadb = require('faunadb');

let secret = faunaUserKey;
let client = new faunadb.Client({secret: secret});



const runQuery = async function(query) {
    return fetch('https://graphql.fauna.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ` + secret,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({query: query})
    }).then((res) => res.json())
}

// Query(
//     Lambda(
//       ["email", "password"],
//       Create(Collection("Account"), {
//         credentials: { password: Var("password") },
//         data: { email: Var("email") }
//       })
//     )
//   )

const register = function(email, password, name, location, phone) {
    const query = `
        mutation RegisterUser {
            register (
                email: "${email}"
                password: "${password}"
            ) {
                email
            }
            createUser(
                data: { 
                  name: "${name}"
                  email: "${email}"
                  location: { 
                    connect: "${location}" 
                  } 
                  phone: "${phone}"
                }) {
                name
                phone
                email
                _id
              }
    }     
    `
    return runQuery(query).then((result) => {
        console.log('RegisterUser RESULT: ', result)
        return result.data;
    })
}

// Query(
//     Lambda(
//       ["email", "password"],
//       Select(
//         ["secret"],
//         Login(Match(Index("accountByEmail"), Var("email")), {
//           password: Var("password")
//         })
//       )
//     )
//   )

const login = function(email, password) {
    const query = `
        mutation LoginUser {
            login (
                email: "${email}"
                password: "${password}"
            )
        }
    `
    return runQuery(query).then((result) => {
        console.log('LoginUser RESULT: ', result)
        secret = result.data.login
        client = new faunadb.Client({
            secret: secret
        })
        return secret;
    })
}
export { register, login }

