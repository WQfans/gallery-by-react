require('normalize.css/normalize.css');
require('styles/main.css');

var imgData = require('../data/imagedata.json');
import React from 'react';
import ReactDOM from 'react-dom';

//获取图片的数据
function getImgUrl(imgData) {
	var imageDataArr = [];
	for (var i = 0, j = imgData.length; i < j; i++) {
		var singleImageData = imgData[i];
		// singleImageData.imageUrl = require('../images/'+singleImageData.fileName);
		imageDataArr[i] = singleImageData;
	}
	return imageDataArr;
}
var imageDatas = getImgUrl(imgData);


var ImgFigure = React.createClass({
	/*
	点击处理函数
	*/
	handleClick: function(e) {

		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}

		e.stopPropagation();
		e.preventDefault();
	},
	render: function() {
		var styleObj = {};
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
		if (this.props.arrange.rotate) {
			styleObj['WebkitTransform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
		}

		if (this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}
		var imageURL = ('../images/' + this.props.data.fileName);

		var imgFigureClassName = 'img-figure';
		imgFigureClassName = imgFigureClassName + (this.props.arrange.isInverse ? ' is_inverse' : '');
		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img className='image' src={imageURL} alt={this.props.data.title} />
				<figcaption>
					<h2 className='img-title'>{this.props.data.title}</h2>
					<div className='img-back' onClick={this.handleClick}>
					{this.props.data.desc}
					</div>
				</figcaption>
			</figure>
		)
	}
})

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

function get30deRandom() {
	return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

var ControlUnit = React.createClass({
	handleClick: function(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}

		e.preventDefault;
		e.stopPropagation;
	},
	render: function(){
		var controllerClassName = 'controller-unit';
		controllerClassName = controllerClassName + (this.props.arrange.isInverse ? ' is_inverse' : '');
		controllerClassName = controllerClassName + (this.props.arrange.isCenter ? ' is_center' : '');
		return (
			<span className={controllerClassName} onClick={this.handleClick}>
				<img className={controllerClassName} src='../images/arrow.png'/>
			</span>
		)
	}
})
var galleryByReact = React.createClass({
	Constant: {
		centerPos: {
			left: 0,
			right: 0
		},
		hPosRange: { //水平范围
			leftSecX: [0, 0],
			rightSecx: [0, 0],
			y: [0, 0]
		},
		vPosRange: { //垂直范围
			x: [0, 0],
			topY: [0, 0]
		}
	},

	/*
	翻转
	*/
	inverse: function(index) {
		return function() {
			var imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})
		}.bind(this);
	},
	/*
	 *指定居中哪个图片
	 */
	rearrange: function(centerIndex) {
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,

			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecx,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,


			topImgNum = Math.floor(Math.random() * 2),
			topImgSpliceIndex = 0,

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

		imgsArrangeCenterArr[0] = {
				pos: centerPos,
				rotate: 0,
				isCenter: true
			}
			//中间不需要旋转

		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
		var imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		//布局上侧的
		imgsArrangeTopArr.forEach(function(value, index) {
			imgsArrangeTopArr[index] = {
				pos: {
					top: getRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate: get30deRandom(),
				isCenter: false
			}
		});

		//两侧
		for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
			var hPosRangeLORX = null;

			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			} else {
				hPosRangeLORX = hPosRangeRightSecX;
			}
			imgsArrangeArr[i] = {
				pos: {
					top: getRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate: get30deRandom(),
				isCenter: false
			}
		}



		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		this.setState({
			imgsArrangeArr: imgsArrangeArr
		})
	},

	/*
	 *居中对应index的照片
	 */
	center: function(index) {
		return function() {
			this.rearrange(index);
		}.bind(this)
	},

	getInitialState: function() {
		return {
			imgsArrangeArr: [
				/*pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				*/
			]
		}
	},

	//计算图片位置
	componentDidMount: function() {
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageWidth = stageDOM.scrollWidth,
			stageHeight = stageDOM.scrollHeight,
			halfStageWidth = Math.ceil(stageWidth / 2),
			halfStageHeight = Math.ceil(stageHeight / 2);

		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgWidth = imgFigureDOM.scrollWidth,
			imgHeight = imgFigureDOM.scrollHeight,
			halfImgWidth = Math.ceil(imgWidth / 2),
			halfImgHeight = Math.ceil(imgHeight / 2);

		//中心图片
		this.Constant.centerPos = {
			left: halfStageWidth - halfImgWidth,
			top: halfStageHeight - halfImgHeight
		}

		//左右范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgWidth;
		this.Constant.hPosRange.leftSecX[1] = halfStageWidth - 3 * halfImgWidth;
		this.Constant.hPosRange.rightSecx[0] = halfStageWidth + halfImgWidth;
		this.Constant.hPosRange.rightSecx[1] = stageWidth - halfImgWidth;
		this.Constant.hPosRange.y[0] = -halfImgHeight;
		this.Constant.hPosRange.y[1] = stageHeight - halfImgHeight;

		//上下范围
		this.Constant.vPosRange.topY[0] = -halfImgHeight;
		this.Constant.vPosRange.topY[1] = halfStageHeight - 3 * halfImgHeight;
		this.Constant.vPosRange.x[0] = halfStageWidth - imgWidth;
		this.Constant.vPosRange.x[1] = halfImgWidth;

		this.rearrange(0);

	},
	render: function() {

		var imgFigures = [];
		var controlUnits = [];
		imageDatas.forEach(function(value, index) {
			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}
			imgFigures.push((<ImgFigure data={value} key={'index'+index} ref={'imgFigure' + index}
				arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>));

			controlUnits.push((<ControlUnit key={'controlUnit'+index} ref={'controlUnit' + index}
				arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>));
		}.bind(this));

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