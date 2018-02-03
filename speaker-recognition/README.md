# In this folder:

git clone https://github.com/ppwwyyxx/speaker-recognition.git

docker build -t sr:0.1 . && docker run -it -p 5000:5000 sr:0.1

# You now have a server running on localhost:5000
The API is real simple and looks like this:

# Add input data for a user (must be mono wav file!)
```
curl -X POST -F audio=@<filename> localhost:5000/data/<user>
```

Return value is a gid. Feel free to ignore it. Keep adding data for users. You can add as many clips as you like pre user.

# Building the model
```
curl -X POST localhost:5000/enroll
```

Calling enroll builds the model. It can take a second or ten. Return value is a string. Ignore it.

# Classifying who's speaking (mono wav again!)
```
curl -X POST -F audio=<filename> localhost:5000/classify
```

Calling this endpoint will return the name of the user with the highest probability of appaering in this clip
