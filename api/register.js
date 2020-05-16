const {register} = require('./_utils/fauna');

module.exports = (req, res) => {
    const data = JSON.parse(req.body);
    const {email, password, name, location, phone} = data;
   register(email, password, name, location, phone).then((result) => {
       console.log('the result: ', result)
        return res.status(200).json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    });
    
}