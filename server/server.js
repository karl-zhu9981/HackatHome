const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const extractAudio = require('ffmeg-extract-audio');
const speech = require('./speech.js')

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hackathome:" + process.env.DB_PASS + "@hackathome-yeaxx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  // perform actions on the collection object
  client.close();
});

// add a  
app.post('/submit-video', async (req, res, next) => {
  videoPath = req.params.video.path;

  // Extracts audio from video
  const mp3AudioStream = await extractAudio({
    input: videoPath,
    output: 'audio.mp3'
  });

  const transcript = speech.transcription(mp3AudioStream);

});

app.use(express.static(__dirname + '/public'));
