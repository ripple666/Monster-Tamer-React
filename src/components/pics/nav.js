import React, { Component } from 'react';
import './pics.scss'

export class Mynav extends Component {
	constructor(props) {
	    super(props);
	    this.state={
	    	itemWidth:130,
	    	botlineLeft:0
	    }
	}

	navto(idx,id){
		this.setState({
			botlineLeft:idx*this.state.itemWidth+'px'
		})
		this.props.onNav(id)
	}

	render() {
		return (
			<div className="my-nav">
				<ul className="clearfloat">
				{
					this.props.nav.navs.map((nav,idx) =>
						<li className='noselect' onClick={(e) =>this.navto(idx,nav.id)} key={nav.id}>
							{nav.name}
						</li>
					)
				}
				<i className="bot-line" style={{left:this.state.botlineLeft}}></i>
				</ul>
			</div>
		);
	}
}
