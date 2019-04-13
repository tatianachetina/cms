var express = require('Express')
var router = express.Router();
var Contact = require('../models/contacts.js')
var sequenceGenerator = require('./sequenceGenerator')


var getContacts = function(response) {
Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
    if (err) {
        return response.status(500).json({
            title: 'An error ocured',
            error: err
        });
    }
    response.status(200).json({
        contact: 'Success',
        obj: contacts
    });
})
}

var saveContact = function(response, contact) {
    if (contact.group && contact.group.length > 0) {
        for (let groupContact of contact.group) {
          groupContact = groupContact._id;
        }
      }
    Contact.save(function (err) {
        if (err) {
            return response.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        return getContacts(null, response)
})
}

function deleteContact(response, contact) {
Contact.remove(function (err) {
     if (err) {
         return response.status(500).json({
             title: 'An error occured',
             error: err
         });
     }
     return getContacts(null, response);
});
}

router.get('/', function (request, response, next) {
getContacts(response);
  });


router.post('/', function (request, response, next) {
var maxContactId = sequenceGenerator.nextId("contacts");

var contact = new Contact({
  id: maxContactId,
  name: request.body.name,
  email: request.body.email,
  phone: request.body.phone,
  imageUrl: request.body.imageUrl
});

saveContact(response, contact);

});

router.patch('/:id', function (request, response, next) {
    Contact.findOne({id: request.params.id}, function (err, contact) {
      if (err || !contact) {
        return response.status(500).json({
          title: 'No Contact Found!',
          error: {contact: 'Contact not found'}
        })
      }
  
      contact.name = request.body.name;
      contact.email = request.body.email;
      contact.phone = request.body.phone;
      contact.imageUrl = req.body.imageUrl;
    //   contact.group = req.body.group;

  
      saveContact(reponses, contact)
    });
  });

router.delete("/:id", function (request, response, next){
var query = {id:request.params.id};

Contact.findOne(query, function (err, contact) {
    if (err) {
        return response.status(500).json({
            title: 'No Contact Found',
            error: err
        });
    }
    if (!contact){
        return response.status(500).json({
            title: 'No contact Found',
            error: {contactId: request.params.id}
    });
}
deleteContact(response, contact);
});
});

module.exports = router;