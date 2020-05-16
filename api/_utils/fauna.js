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

const register = function(email, password, name, location, phone) {
    console.log(email, password)
    const query = `
        mutation RegisterUser {
            register (
                email: "${email}"
                password: "${password}"
            ) {
                _id
            }
        createUser(
            data: { 
                name: "${name}", 
                location: "${location}",
                phone: "${phone}" 
            }) {
            name
            location
            phone
            _id
        }
    }     
    `
    return runQuery(query).then((result) => {
        console.log('REGISTER RESULT: ', result)
        return result.data.register
    })
}

const login = async function(email, password) {
    const query = `
        mutation LoginUser {
            login (
                email: "${email}"
                password: "${password}"
            )
        }
    `
    return runQuery(query).then((result) => {
        console.log('QUERY RESULT: ', result)
        secret = result.data.login
        client = new faunadb.Client({
            secret: secret
        })
        return secret;
    })
}
export { register, login }

