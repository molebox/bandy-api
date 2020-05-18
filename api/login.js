const {login} = require('./_utils/fauna');

module.exports = (req, res) => {
    const data = JSON.parse(req.body);
    const {email, password} = data;
   login(email, password).then((result) => {
       console.log('the login result: ', result)
        return res.status(200).json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    });
    
}