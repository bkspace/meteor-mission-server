import express from 'express';
import cors from 'cors';
import Quadrant from './quadrant';
import bodyParser from 'body-parser';
import { shoppingList } from './database';

const q = new Quadrant();
const app = express();
// const jsonParser = bodyParser.json();
const textParser = bodyParser.text()

const formatMessage = (msg) => `data: ${msg}\n\n`;

function getIdFromBeacons(beacon) { // [1,2,3]
  const quads = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
  };
  return quads[beacon]
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Starting server on 3000');
});

app.post('/update', textParser, (req, res) => {
  const newQuad = getIdFromBeacons(req.body);
  q.update(newQuad);
  res.end(req.body + "hello");
});

app.get('/connect', cors(), (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  q.addChangeListener((e) => res.write(formatMessage(e.detail.quadrant)));
});
