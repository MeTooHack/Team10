# TEAM 10

The idea is to record meetings, discussions etc and identify voices and visualise data for who speaks when and how much etc.

## How to run
In order for this to work you need to clone the [pyAudioAnalysis repo](https://github.com/tyiannak/pyAudioAnalysis)

From repo root:
`git clone git@github.com:tyiannak/pyAudioAnalysis.git`

Then build the dockerfile:
`docker build -t timten .`

Then run container just created:
`docker run -p 5000:5000 -d timten`

Then try curling it (requires a .wav file as input):
`curl -F "audio=@soleng.wav" localhost:5000/gender`

## Maintainers
@litenjacob
@eriklarko
@widarlein
@Unarmed
@Solisol