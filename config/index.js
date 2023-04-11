require('dotenv').config();
module.exports = {
  endpoint: process.env.API_URL,
  port: parseInt(process.env.PORT)
};