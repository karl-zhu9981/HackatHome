const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const createTranscript = require('./speech');
const multer = require('multer');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const tmp = require('tmp');
tmp.setGracefulCleanup()
const fs = require("fs")

const MAX_FILE_SIZE = 1073741824;

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE }
});


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://hackathome:${process.env.DB_PASS}@hackathome-yeaxx.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("Connected to MongoDB")
  const collection = client.db("zune-lectures").collection("lecture-data");

  app.post('/submit-video', upload.single('file'), async (req, res, next) => {
    const videoBuffer = req.file.buffer;

    const tmpobj = tmp.fileSync({ postfix: '.mp4' }).name;
    fs.writeFileSync(tmpobj, videoBuffer)
    res.status(200).send('Video successfully uploaded.');

    // Extracts audio from video
    const mp3AudioStream = ffmpeg(tmpobj)
      .format("s16le")
      .audioBitrate("16k")
      .audioChannels(2)
      .stream()

    const transcription = await createTranscript(mp3AudioStream);
    console.log("Transcript: " + transcription)

    // TODO: Change username to the user's name
    const username = 1;
    const document = { "id": username, "transcription": transcription, "videoBuffer": videoBuffer };

    collection.insertOne(document)
      .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`));
  });

  client.close();
});

app.use(express.static(__dirname + '/public'));
