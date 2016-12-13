require('normalize.css/normalize.css');
require('styles/main.css');

var imgData = require("../data/imagedata.json");
import React from 'react';

function getImgUrl(imgData){
	var imageDataArr = [];
	for(var i=0,j=imgData.length;i<j;i++){
		var singleImageData = imgData[i];
		singleImageData.imageUrl = require('../images/'+singleImageData.fileName);
		imageDataArr[i] = singleImageData;
	}
	return imageDataArr;
}
var imageData = getImgUrl(imgData);
console.log(imageData);

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
