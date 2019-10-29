const express = require('express');
const os = require('os');
var bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/save', (req, res) => {
    console.log('reqbody ', req.body);
    res.send({ greet: 'ciao' });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
