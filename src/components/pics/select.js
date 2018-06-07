import React, { Component } from 'react';
import Velocity from 'velocity-animate'
import './pics.scss'

export class Myselect extends Component {
	constructor(props) {
	    super(props);
	    this.selectId = `select-${props.select.id}`
	    this.state={
	    	isOpen:true,
	    	curOption:props.select.options[0].name
	    }
	}

	openOption(){
		this.slideToggle(true)
	}

	slideToggle(toggle){
		const state = this.state
		Velocity(document.getElementById(this.selectId).querySelector('.select-ul'), {
		    height:state.isOpen && toggle ? this.props.select.options.length*30 : 0,
		    opacity:state.isOpen && toggle ? 1 :0
		}, {
		    duration:400,
		    complete:() =>{
				this.setState({
					isOpen:!state.isOpen
				})
			}
		})
	}

	setOption(e,idx,id){
		this.setState({
			curOption:this.props.select.options[idx].name
		})
		this.slideToggle(true)
		this.props.onSelect(id)
	}

	componentDidMount(){
		var that = this;

		document.onclick = function(e){
			if(!document.getElementById(that.selectId).contains(e.target)){
				that.slideToggle(false)
			}
		}
		const ulTempStyle = document.getElementById(this.selectId).querySelector('.select-ul-temp').style
		const height = ulTempStyle.height
		const width = ulTempStyle.width;
		this.setState({
			ulTempHeight:height
		})
		document.getElementById(this.selectId).querySelector('.cur-btn').style.width = (parseFloat(width)+10)+'px'
	}

	componentWillUnmount(){
		document.onclick = null
	}

	render() {
		const props = this.props;
		return (
			<div id={`${this.selectId}`} className="my-select">
				<div className="cur-btn" onClick={(e) => this.openOption(e)}>
					{this.state.curOption}
					<i className="icon-bg select-icon" />
				</div>
				<div>
					<ul className="select-ul my-scroll"  style={{height:'0'}}>
						{props.select.options.map((option,idx) =>
							<li onClick={e =>this.setOption(e,idx,option.id)} key={option.id}>
								{option.name}
							</li>
						)}
					</ul>
					<ul className="select-ul-temp"  style={{left:'-99999px',position:'absolute'}}>
						{props.select.options.map((option) =>
							<li key={option.id}>
								{option.name}
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}
}