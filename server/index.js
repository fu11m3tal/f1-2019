const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));
var data = {}
app.post('/api/f1Client', (req, res) => {
  data = req.body
  console.log(data)
  res.send("saved")
})

app.get('/api', (req, res) => {
  res.send(data)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});



