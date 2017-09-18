var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;


/* GET users listing. */
router.get('/:action', function(req, res, next) {

var action = req.params.action

if (action == 'send'){// send the email

var from_email = new helper.Email('garyscopel1991@gmail.com');
var to_email = new helper.Email('garyscopel1991@gmail.com');
var subject = 'This is a test';
var content = new helper.Content('text/html', 'Hello, From Email Dispatch!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  if (error){
    res.json({
      confirmation: 'fail',
      message: error
    })
    return
  }
  res.json({
    confirmation: 'success',
    response: response
  })
  // console.log(response.statusCode);
  // console.log(response.body);
  // console.log(response.headers);
});

  // res.json({
  //   confirmation: 'success',
  //   action: action
  // })
  return
}
  res.json({
    confirmation: 'fail',
    message: 'Invalid Action'
  })
})

module.exports = router;
