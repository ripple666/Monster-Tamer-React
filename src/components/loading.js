import React, { Component } from 'react';

export class Loading extends Component {
	constructor(props) {
	    super(props);
	    this.state={
	    }
	}
	render() {
		let props =  this.props
		return (
			<div className="my-loading" style={props.loadingStyle}>
				<div className="loading-bg"></div>
			
					{props.loadingInnerHtml}
			
			</div>
		);
	}
}
