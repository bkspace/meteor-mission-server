import express from 'express';
import cors from 'cors';
import Quadrant from './quadrant';
const q = new Quadrant();

const app = express();

const formatMessage = (msg) => `data: ${msg}\n\n`;

app.listen(process.env.PORT || 3000, () => {
  console.log('Starting server on 3000');
});

app.get('/update', (req, res) => {
  q.update(Math.random());
  res.end('ok');
});

app.get('/connect', cors(), (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  q.addChangeListener((e) => res.write(formatMessage(e.detail.quadrant)));
});
