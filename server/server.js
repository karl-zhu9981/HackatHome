const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


// add a  
app.get('/submit-video', (req, res, next) => {
  console.log(req.query.videoURL);
  res.send('ge');
});

app.use(express.static(__dirname + '/public'));

