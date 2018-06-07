

import React, { Component } from 'react';

export class Player extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 

	    };
	}

	render() {
		const player = parseInt(this.props.match.params.id, 10)

	  	return (
		    <div>
		      <h1>1</h1>
		      <div>{player}</div>
		    </div>
		)
	}
}

