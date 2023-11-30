// index.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/:recipientService/*', async (req, res) => {
  try {
    const recipientServiceName = req.params.recipientService;
    const recipientURL = process.env[recipientServiceName];

    if (!recipientURL) {
      return res.status(502).json({ error: 'Cannot process request' });
    }

    const forwardedHeaders = {
      ...req.headers,
      host: new URL(recipientURL).host,
    };
    console.log('url:', `${recipientURL}${req.url}`);
    const response = await axios({
      method: req.method,
      url: `${recipientURL}${req.url}`,
      data: req.body,
      headers: forwardedHeaders,
      params: req.query,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log('error', error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`BFF Service is running on port ${PORT}`);
});
