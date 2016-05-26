import express from 'express';

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log('Starting server on 3000');
});
