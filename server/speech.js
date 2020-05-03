// Imports the Google Cloud client library for Beta API
/**
 * TODO(developer): Update client library import to use new
 * version of API when desired features become available
 */
const speech = require('@google-cloud/speech').v1p1beta1;

const createTranscript = (audioStream) => new Promise((resolve, reject) => {
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
    enableAutomaticPunctuation: true,
    useEnhanced: true
  };
  
  const request = {
    config: config,
    interimResults: false
  };

  const array = []

  // Stream the audio to the Google Cloud Speech API
  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', reject)
    .on('data', data => {
        array.push(data.results[0].alternatives[0].transcript);
    })
    .on('end', () => resolve(array.join('\n')));

  audioStream.pipe(recognizeStream);
})

module.exports = createTranscript;