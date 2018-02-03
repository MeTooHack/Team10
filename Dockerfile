FROM python:2.7

RUN pip install flask
RUN pip install numpy matplotlib scipy sklearn hmmlearn simplejson eyed3 pydub
RUN apt-get update && apt-get install libav-tools -y

ADD pyAudioAnalysis /pyAudioAnalysis
ENV PYTHONPATH=$PYTHONPATH:"/"
ADD src /src

CMD python /src/timten.py