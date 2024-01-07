const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger')
const path = require('node:path')
const { BASE_DIR } = require('../settings')

router.get('/ping', (req, res) => {
  res.send('pong... Server is up and running.');
  logger.info('Pong...')
});

router.post('/upload', (req, res) => {
  const file = req.files.fileInput
  if (!file) {
    logger.error(`file is empty. ${file}`)
    res.status(400).json({
      success: false,
      message: 'File cannot be empty.'
    })
  }

  const filePath = path.join(BASE_DIR, "uploads", file.name)

  file.mv(filePath, () => {
    const message = `File ${file.name} was uploaded to: ${filePath}`
    logger.info(message)
    res.status(200).json({
      success: true,
      message: message
    })
  })
});

module.exports = router;