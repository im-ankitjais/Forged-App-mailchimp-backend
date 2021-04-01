var request = require('superagent');
require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())


const PORT = process.env.PORT || 5001;
app.get('/', (req, res,next) => {
  res.send('Hello World! You are at Penny Stocks api path!')
})
var mailchimpInstance   = process.env.SERVER,
    listUniqueId        = process.env.LIST_KEY,
    mailchimpApiKey     = process.env.API_KEY;

app.post('/subscribe', function (req, res,next) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });
});

app.listen(PORT || 5001, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

