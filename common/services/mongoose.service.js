const mongoose = require('mongoose');
let count = 0;

const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxRetries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectionWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose
    .connect('mongodb://localhost:27017/rest-tutorial', options)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch(err => {
      console.warn(
        'MongoDB connection unsuccessful, retrying after 5 seconds. ',
        ++count
      );
      setTimeout(connectionWithRetry, 5000);
    });
};

connectionWithRetry();

exports.mongoose = mongoose;
