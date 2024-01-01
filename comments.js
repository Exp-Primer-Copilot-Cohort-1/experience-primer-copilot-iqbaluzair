// Create web server
var express = require('express');
var router = express.Router();

// Load mongoose model
var Comment = require('../models/comment');

// Route: /comments
router.route('/')

    // GET: /comments
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    })

    // POST: /comments
    .post(function(req, res) {
        var comment = new Comment(req.body);
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Comment added' });
        });
    });

// Route: /comments/:comment_id
router.route('/:comment_id')

    // GET: /comments/:comment_id
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.send(err);
            }
            res.json(comment);
        });
    })

    // PUT: /comments/:comment_id
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.send(err);
            }
            comment.text = req.body.text;
            comment.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send({ message: 'Comment updated' });
            });
        });
    })

    // DELETE: /comments/:comment_id
    .delete(function(req, res) {
        Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Comment deleted' });
        });
    });

module.exports = router;