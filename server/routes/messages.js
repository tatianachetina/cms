var express = require('express');
var router = express.Router();
var Message = require('../models/message')
var sequenceGenerator = require('./sequenceGenerator')

function getMessages(request, response) {
   Message.find().exec(function (err, messages) {
        if (err) {
            return response.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        return response.status(200).json(messages);
   })
}

function saveMessage(response, message) {
    message.save(function (err) {
         if (err) {
             return response.status(500).json({
                 title: 'An error occured',
                 error: err
             });
         }
         return getMessages(null, response)
    })
 }

 function deleteMessage(response, message) {
    Message.remove(function (err) {
         if (err) {
             return response.status(500).json({
                 title: 'An error occured',
                 error: err
             });
         }
         return getMessages(null, response);
    });
 }

router.get('/', function (request, response, next) {
    getMessages(response);
      });


router.post('/', function (request, response, next) {
    var maxMessageId = sequenceGenerator.nextId("messages");
  
    var message = new Message({
      id: maxMessageId,
      name: request.body.name,
      msgText: request.body.msgText,
      sender: request.body.sender
    });

    saveMessage(response, message);

});
  
router.patch('/:id', function (request, response, next) {
    Message.findOne({id: request.params.id}, function (err, message) {
      if (err || !message) {
        return response.status(500).json({
          title: 'No Message Found',
          error: {document: 'No Message Found'}
        })
      }
  
      message.name = request.body.name;
      message.msgText  = request.body.msgText ;
      message.sender  = request.body.sender ;
  
      saveMessage(reponses, message)
    });
  });

  
  router.delete("/:id", function (request, response, next){
   var query = {id:request.params.id};

    Message.findOne(query, function (err, document) {
        if (err) {
            return response.status(500).json({
                title: 'No Message Found',
                error: err
            });
        }
        if (!message){
            return response.status(500).json({
                title: 'No Message Found',
                error: {messageId: request.params.id}
        });
    }
    deleteMessage(response, message);
});
});

module.exports = router;
        