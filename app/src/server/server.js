const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json())

app.get('/', function (req, res) {
 return res.send('pong');
});

app.post('/user',  (req, res) => {
  console.log(req.body)

  res.send(req.body)
});

app.listen(process.env.PORT || 8080, ()=>{
  console.log(`simple server listening at http://localhost:8080`)
});


