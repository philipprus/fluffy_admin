const mongoose = require('mongoose');

class MongoConnection {
      constructor(url) {
          this.url = url;
          this.initialized = false;
      }
      async connect() {
          this.client = await mongoose.connect(this.url, { useNewUrlParser: true });
          console.log("MongoDB database connection established successfully");
          this.initialized = true;
      }
      async close() {
          if (!this.initialized)
              return;
          await this.client.disconnect();
          console.log("MongoDB database deconnection established successfully");
          this.initialized = false;
      }
  }
  
  module.exports = { MongoConnection };