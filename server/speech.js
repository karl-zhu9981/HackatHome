// Imports the Google Cloud client library for Beta API
/**
 * TODO(developer): Update client library import to use new
 * version of API when desired features become available
 */
const speech = require('@google-cloud/speech').v1p1beta1;

const createTranscript = async (audioBuffer) => {
  const client = new speech.SpeechClient();

  const model = 'video';
  const encoding = audioBuffer.format;
  const sampleRateHertz = audioBuffer.frequency;
  const languageCode = 'en-US';

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    model: model,
    enableAutomaticPunctuation: true,
    useEnhanced: true
  };
  
  const audio = {
    content: audioBuffer.data.toString('base64'),
  };
  
  const request = {
    config: config,
    audio: audio,
  };
  
  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  return transcription
}

module.exports = createTranscript;