require('normalize.css/normalize.css');
require('styles/main.css');

var imgData = require("../data/imagedata.json");
import React from 'react';
import ReactDOM from 'react-dom';

//获取图片的数据
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

var galleryByReact = React.createClass({
	render: function(){
		return (
			<section className="stage">
				<section className="img-sec">
				</section>
				<nav className="controller-nav">
				</nav>
			</section>
		)
	}
})

ReactDOM.render(<galleryByReact />, document.getElementById('app'));

module.exports = galleryByReact;
