const {client, query} = require('./_utils/db');

module.exports = (req, res) => {
    res.json({ name: 'John', email: 'john@example.com' })
}