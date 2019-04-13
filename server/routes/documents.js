var express = require('express');
var router = express.Router();
var Document = require('../models/documents.js')
var sequenceGenerator = require('./sequenceGenerator')

function getDocuments(request, response) {
   Document.find().exec(function (err, documents) {
        if (err) {
            return response.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        return response.status(200).json(documents);
   })
}

function saveDocument(response, document) {
    Document.save(function (err) {
         if (err) {
             return response.status(500).json({
                 title: 'An error occured',
                 error: err
             });
         }
         return getDocuments(null, response)
    })
 }

 function deleteDocument(response, document) {
    Document.deleteOne({id: document.id })
        .then(result => {
            return getDocuments(null, response);
        })
        .catch(error => {
            return response.status(500).json({
                title: 'An error occured',
                error: err
            });
        });
 }

router.get('/', function (request, response, next) {
    getDocuments(request, response);
      });


router.post('/', function (request, response, next) {
    var maxDocumentId = sequenceGenerator.nextId("documents");
  
    var document = new Document({
      id: maxDocumentId,
      name: request.body.name,
      description: request.body.description,
      url: request.body.url
    });
    
    saveDocument(response, document);
});
  
router.patch('/:id', function (request, response, next) {
    Document.findOne({id: request.params.id}, function (err, document) {
      if (err || !document) {
        return response.status(500).json({
          title: 'No Document Found!',
          error: {document: 'Document not found'}
        })
      }
  
      document.name = request.body.name;
      document.description = request.body.description;
      document.url = request.body.url;
  
      saveDocument(reponses, document)
    });
  });
  
router.delete("/:id", function (request, response, next){
   var query = {id:request.params.id};

    Document.findOne(query, function (err, document) {
        if (err) {
            return response.status(500).json({
                title: 'No Document Found',
                error: err
            });
        }
        if (!document){
            return response.status(500).json({
                title: 'No Document Found',
                error: {documentId: request.params.id}
        });
    }
    deleteDocument(response, document);
});
});

module.exports = router;
        