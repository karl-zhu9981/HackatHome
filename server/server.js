const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const createTranscript = require("./speech");
const multer = require("multer");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const tmp = require("tmp");
tmp.setGracefulCleanup();
const fs = require("fs");
require("dotenv").config();

const MAX_FILE_SIZE = 1073741824;

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

const MongoClient = require("mongodb").MongoClient;
console.log(process.env.DB_PASS);
const uri =
  "mongodb+srv://dbUser:a@cluster0-ruk6n.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: false });
client.connect((err) => {
  if (err) {
    console.log(err);
  }

  console.log("Connected to MongoDB");
  const collection = client.db("zune-lectures").collection("lecture-data");

  // Submission of the video
  app.post(
    "/submit-video/:userID",
    upload.single("file"),
    async (req, res, next) => {
      const userID = Number(req.params.userID);

      const videoBuffer = req.file.buffer;

      const tmpobj = tmp.fileSync({ postfix: ".mp4" });
      fs.writeFileSync(tmpobj.name, videoBuffer);

      // await new Promise(resolve => setTimeout(resolve, 60000));
      // Extracts audio from video
      const audio = await new Promise((resolve, reject) => {
        const buffers = [];
        ffmpeg(tmpobj.name)
          .format("mp3")
          .audioFrequency(44100)
          .on("error", function (err, stdout, stderr) {
            console.log("stdout:\n" + stdout);
            console.log("stderr:\n" + stderr); //this will contain more detailed debugging info
            reject(err);
          })
          .stream()
          .on("data", function (buffer) {
            buffers.push(buffer);
          })
          .on("end", function () {
            resolve({data: Buffer.concat(buffers), format: "MP3", frequency: 44100});
          });
      });
      tmpobj.removeCallback();

      const transcription = await createTranscript(audio);
      console.log("Transcript: " + transcription);

      // TODO: Change username to the user's name
      const document = {
        id: userID,
        transcription: transcription,
        videoBuffer: videoBuffer,
      };

      collection
        .insertOne(document)
        .then((result) =>
          console.log(
            `Successfully inserted item with _id: ${result.insertedId}`
          )
        )
        .catch((err) => console.error(`Failed to insert item: ${err}`));

        
      res.status(200).send("Video successfully uploaded.");
    }
  );

  app.get("/get_transcript/:userID", async (req, res, next) => {
    const userID = req.params.userID;

    const query = { id: userID };
    const projection = { transcription: 1 };

    collection
      .findOne(query, projection)
      .then((result) => {
        if (result) {
          console.log(`Found transcript for ${userID}`);
          res.send(result.transcription);
        } else {
          res.status(404).send(`User ${userID} has no transcript`);
        }
      })
      .catch((err) => console.error(`Error finding transcript for ${userID}`));
  });

  app.get("/get_video/:userID", async (req, res, next) => {
    const userID = req.params.userID;

    const query = { id: userID };
    const projection = { videoBuffer: 1 };

    collection
      .findOne(query, projection)
      .then((result) => {
        if (result) {
          console.log(`Found video buffer for ${userID}`);
          res.send(result.videoBuffer);
        } else {
          res.status(404).send(`User ${userId} has no video buffer`);
        }
      })
      .catch((err) =>
        console.error(`Error finding video buffer for ${userID}`)
      );
  });

  app.get("/videos", async (req, res, next) => {
    res.status(200).send(await collection.distinct("id"))
  })
});

app.use("/", express.static(__dirname + "/public"));
app.use("/doc/*", express.static(__dirname + "/public"));
