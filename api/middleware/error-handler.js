const router = require('express').Router();
// Variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

router.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  ;
  res.status(err.status || 500)
    .setHeader('Content-Type', 'application/json')
    .send({
      "status": err.status || 500,
      "message": err.message
    })
    .json({ err })
});

module.exports = router;