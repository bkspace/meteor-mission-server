import express from 'express';
import cors from 'cors';
import Quadrant from './quadrant';
import bodyParser from 'body-parser';
import { shoppingList } from './database';

const q = new Quadrant();
const app = express();
const jsonParser = bodyParser.json();

const formatMessage = (msg) => `data: ${msg}\n\n`;

function getIdFromBeacons(beacons = []) { // [1,2,3]
  const quads = {
    '123': 'one', // F is the quadrant
    '234': 'two',
    '345': 'three',
    '467': 'four',
    '247': 'five',
    '278': 'six',
  };

  const sortedBeacons = beacons.sort().join('');

  if (quads[sortedBeacons]) {
    return quads[sortedBeacons];
  }
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Starting server on 3000');
});

app.post('/update', jsonParser, (req, res) => {
  const newQuad = getIdFromBeacons(req.body);
  q.update(newQuad);
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
