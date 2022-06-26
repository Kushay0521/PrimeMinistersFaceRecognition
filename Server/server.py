
from flask import Flask,request,jsonify
import util

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/classify": {"origins": "http://localhost:5500"}})
 
@app.route('/')
def home(): 
    return "Welcome to the flask server"

@app.route('/classify',methods=['GET','POST'])
#@cross_origin(origin='localhost:5500',headers=['Content- Type','Authorization'])
def classify():
    data=request.get_json()
    img_data=data['img_data']
    response=jsonify(util.classify_image(img_data))
    #response=jsonify(util.classify_image(None,'./test_images/narendra_modi1.jpg'))
    response.headers.add("Access-Control-Allow-Origin", "*");
    response.headers.add("Access-Control-Allow-Headers", "Content-Type");
    return response
 
if __name__=="__main__":
    util.load_helpers()
    app.run(port=5000)