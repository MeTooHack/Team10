from flask import Flask, request
import os
import subprocess
import uuid
from scipy.io import wavfile

app = Flask(__name__)

@app.route("/data/<string:user>", methods=['POST'])
def data(user):
    print('I R POSTING DATA FOR USER', user)

    directory = '/root/speaker-recognition/input/' + user + '/'
    if not os.path.exists(directory):
        os.makedirs(directory)

    filename = str(uuid.uuid4()) + '.wav'
    path = directory + filename
    request.files['audio'].save(path)
    
    return path

@app.route("/enroll", methods=['POST'])
def enroll():
    dirs = get_immediate_subdirectories("/root/speaker-recognition/input/")
    dirs = " ".join(map(lambda x: '/root/speaker-recognition/input/' + x + '/', dirs))
    print(dirs) 
    subprocess.check_call(['/root/speaker-recognition/src/speaker-recognition.py', '-t', 'enroll', '-i', dirs, '-m', 'model.out'])
    
    return "All users enrolled"

@app.route("/classify", methods=['POST'])
def classify():
    print('I R CLASSIFYING')

    directory = '/root/speaker-recognition/tmp/'
    if not os.path.exists(directory):
        os.makedirs(directory)

    filename = str(uuid.uuid4()) + '.wav'
    path = directory + filename
    request.files['audio'].save(path)

    who=subprocess.check_output(['/root/speaker-recognition/src/speaker-recognition.py', '-t', 'predict', '-i', path, '-m', 'model.out'])
    print(who)
    index = who.find(" -> ")
    user = who[index+4::]
    print(user)
    os.remove(path)
    return user


@app.route("/amplitude", methods=['POST'])
def amplitude():
    directory = '/root/speaker-recognition/tmp/'
    if not os.path.exists(directory):
        os.makedirs(directory)

    filename = str(uuid.uuid4()) + '.wav'
    path = directory + filename
    request.files['audio'].save(path)

    sampFreq, snd = wavfile.read(path)
    sampFreq = sampFreq / 10
    result = [max(snd[i:i+sampFreq]) for i in range(0, len(snd), sampFreq)]
    result = map(lambda x: str(x), result)
    answer = "[" + ", ".join(result) + "]"

    os.remove(path)
    return answer



def get_immediate_subdirectories(a_dir):
    return [name for name in os.listdir(a_dir)
        if os.path.isdir(os.path.join(a_dir, name))]

