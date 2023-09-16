const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express(), bodyParser = require('body-parser');
const {timeout} = require("rxjs");
app.use(bodyParser.json());
const port = process.env.PORT;

let devices = {
  1: {id: 1, name: 'Device 1'},
  2: {id: 2, name: 'device 2'},
  3: {id: 3, name: 'device 3'},
  4: {id: 4, name: 'device 4'},
  5: {id: 5, name: 'device 5'}
}

app.get('/api/', (req, res) => {
  setTimeout(() => res.send(Object.values(Object.values(devices))),
    1000
  )
});

app.delete('/api/:id', (req, res) => {
  delete devices[req.params.id]
  res.status(204).json({ success: true });
})

app.put('/api/:id', (req, res) => {
  console.log(req.body)
  devices[req.params.id] = req.body
  res.status(201).json({ success: true });
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
