const express = require('express');
const passport = require('passport');
const Article = require('../models/Article.js');
const Comment = require('../models/Comment.js');
require('../config/passport')(passport);

const router = express.Router();

/* GET ALL ARTICLES */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    Article.find(function(err, articles) {
      if (err) return err;
      res.json(articles);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

/* GET ONE ARTICLE */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    Article.findOne({ _id: req.params.id }, function(err, article) {
      if (err) return err;
      res.json(article);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

/* SAVE ARTICLE */
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    Article.create(req.body, function(err, post) {
      if (err) return err;
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

/* SAVE COMMENT */
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    Comment.create(req.body)
      .then(function(dbComment) {
        // * If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Comment
        // * { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // * Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return Article.update(
          { _id: req.params.id },
          { $push: { comments: dbComment } },
          { new: true }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

const getToken = function(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};

module.exports = router;
