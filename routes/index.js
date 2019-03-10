const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const article = require('./article.js');
const auth = require('./auth.js');

// API Routes
router.use('/api', apiRoutes);

// Authentication Routes
router.use('/api/article', article);
router.use('/api/auth', auth);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
