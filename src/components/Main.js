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
	Constant: {
		centerPos:{
			left:0,
			right:0
		},
		hPosRange: {//水平范围
			leftSecX: [0,0],
			rightSecx: [0,0],
			y: [0,0]
		},
		vPosRange: {//垂直范围
			x: [0,0],
			topY: [0,0]
		}
	},

//计算图片位置
	componentDidMount: function(){
		var stageDOM = React.findDOMNode( this.refs.stage),
			stageWidth = stageDOM.scrollWidth,
			stageHeight = stageDOM.scrollHeight,
			halfStageWidth = Math.ceil(stageWidth/2),
			halfStageHeight = Math.ceil(stageHeight/2);
	},
	render: function(){

		var imgFigures = [] ;
		var controlUnits = [];

		imageDatas.forEach(function(value,index){
			imgFigures.push((<ImgFigure data={value} key={'index'+index} />));
		});

		return (
			<section className="stage" ref="stage">
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
