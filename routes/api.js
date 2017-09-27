var express = require('express');
var router = express.Router();
var utils = require('../utils')


router.post('/:action', function(req, res, next){

  var action = req.params.action

  if (action == 'send'){// send the email
      var recipients = req.body.recipients //comma seperated list of emails
      var list = recipients.split(',')

      utils.Email.sendEmails(list, req.body, function(){
        res.json({
             confirmation: 'success',
                message: 'Emails Sent!'
          })
      })


      // utils.Email
      // .sendEmail(req.body)
      // .then(function(response){
      //   res.json({
      //       confirmation: 'success',
      //        response: response
      //      })
      // })
      // .catch(function(err){
      //   res.json({
      //       confirmation: 'fail',
      //        message: err
      //      })
      // })
    return
  }
    res.json({
      confirmation: 'fail',
      message: 'Invalid Action'
    })
})

module.exports = router;
