
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, redirect
from flask_cors import CORS, cross_origin
import sklearn
# from sklearn.externals import joblib
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import json
import time
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
model = pickle.load(open('/home/Rishav045/mysite/model.pkl', 'rb'))
tf=pickle.load(open('/home/Rishav045/mysite/tf-idf.pkl', 'rb'))
encoder=pickle.load(open('/home/Rishav045/mysite/encoder.pkl', 'rb'))
@app.route("/")
def root():
    return {"message":"Hello this is a home page"}
@app.route("/predict", methods=['POST'])
def make_prediction():

    if request.method == 'POST':
        X = request.args.get('text')
        X= tf.transform([X]).toarray()
        lang = model.predict(X)
        lang = encoder.inverse_transform(lang)
        result = str(lang[0])



    data_set={'output':result}
    json_dump = json.dumps(data_set)
    return json_dump
if __name__ == '__main__':
    app.run(  debug=True)