# ZuneLectures  

Registered domain name from domain.com: https://www.zunelectures.online/

## Inspiration
With university moving online recently, we all had to get used to online lectures. Often it is difficult to hear or follow the lecture as well due to the online format. Having the notes would be helpful to follow along with the lecture and enable us to write better notes.

## What it does
ZuneLectures transcribes video lectures into text on an interface and allows you to add your own notes and annotations to that transcription while the video is playing, so that you can take better notes on what the video is saying.

The video can be played alongside the notes, and you have tools to use to make highlights and side notes on the transcription of the video, in order to help the user learn more from the video they are watching.

## How we built it
We created a React app that uses a node.js backend, stores the video in a mongoDB database, and uses the google cloud speech-to-text library on that video to receive a transcription. Then, we used React to add the additional tools for users to make side notes and annotations on the transcription UI.

## Challenges we ran into
Figuring out how to process the audio separately from a video file was a challenge for us initially. Once we figured out how to take the audio from the video file, we were able to use GCP on the audio to transcribe it into a text document. We also ran into some challenges with the backend and ensuring that our app and the Google Cloud Platform were linked. Additionally, we ran into issues with connecting to our MongoDB Atlas service, but we tried switching the provider from GCP to Azure and it seemed to fix the issue.

## Accomplishments that we're proud of
We are proud that we managed to overcome sleep and the challenges of working remotely to get a final product running. As well, we are proud we managed to incorporate many technologies in our stack, and that we were able to successfully host on a domain.

## What we learned
We learned how to use React over the weekend and how to use the Google Cloud Platform to convert the audio from the video into the transcription. As well, we learned how to access video processing through MongoDB.

## What's next for ZuneLectures
Increasing our reach to more platforms, including iOS, and Android. Marketing this product to users at different universities across the world, so that they can all benefit from this increased productivity.
