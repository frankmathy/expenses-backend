import config from './common/config/env.config.js';
import bodyParser from 'body-parser';

import express from 'express';

const app = express();
app.use(bodyParser);

app.listen(config.port, () => {
  console.log(`App listening to port ${config.port}`);
});
