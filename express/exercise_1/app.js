import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();
app.use(bodyParser.json());
app.use(logger('default'));

export default app;
