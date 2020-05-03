// Imports the Google Cloud client library for Beta API
/**
 * TODO(developer): Update client library import to use new
 * version of API when desired features become available
 */
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

const createTranscript = (audioStream) => {
  const client = new speech.SpeechClient();

  const model = 'video';
  const encoding = 'LINEAR16';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    model: model,
  };
  
  const request = {
    config: config,
    interimResults: false
  };

  // Stream the audio to the Google Cloud Speech API
  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      console.log(
        `Transcription: ${data.results[0].alternatives[0].transcript}`
      );
    });

  audioStream.pipe(recognizeStream);
}

module.exports = createTranscript;