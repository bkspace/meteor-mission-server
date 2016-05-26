import express from 'express';
import cors from 'cors';

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log('Starting server on 3000');
});

app.get('/connect', cors(), function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  setInterval(() => {
    res.write("This is my data");
  }, 3000);
});
