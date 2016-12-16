require('normalize.css/normalize.css');
require('styles/main.css');

var imgData = require('../data/imagedata.json');
import React from 'react';
import ReactDOM from 'react-dom';

//获取图片的数据
function getImgUrl(imgData){
	var imageDataArr = [];
	for(var i=0,j=imgData.length;i<j;i++){
		var singleImageData = imgData[i];
		// singleImageData.imageUrl = require('../images/'+singleImageData.fileName);
		imageDataArr[i] = singleImageData;
	}
	return imageDataArr;
}
var imageDatas = getImgUrl(imgData);


var ImgFigure = React.createClass({
	render: function(){
		var imageURL = ('../images/'+this.props.data.fileName);
		return (
			<figure className='img-figure'>
				<img className='image' src={imageURL} alt={this.props.data.title} />
				<figcaption>
					<h2 className='img-title'>{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
})


var galleryByReact = React.createClass({
	render: function(){

		var imgFigures = [] ;
		var controlUnits = [];

		imageDatas.forEach(function(value,index){
			imgFigures.push((<ImgFigure data={value} key={'index'+index} />));
		});

		return (
			<section className="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controlUnits}
				</nav>
			</section>
		)
	}
})



ReactDOM.render(<galleryByReact/>, document.getElementById('app'));

module.exports = galleryByReact;
