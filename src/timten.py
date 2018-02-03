from flask import Flask, jsonify, request
from pyAudioAnalysis import audioTrainTest as aT

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/gender', methods=['POST'])
def gender():
    
    inputFile = request.files['audio']
    inputFile.save('./lol.wav')
    
    classification = aT.fileClassification('./lol.wav', "pyAudioAnalysis/data/svmSpeakerFemaleMale","svm")
    percentages = classification[1]
    labels = classification[2]

    result = {}
    for i in range(0, len(labels)):
        result[labels[i].lower()] = percentages[i]

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')