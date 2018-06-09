import React, { Component } from 'react';

import {setCurNavStyle} from '../utils/api.js'
import {CardEgg} from '../components/card'


let nasEgg = {
	type:'nas',
	egbg:require('../assets/images/egg-bg-01.jpg'),
	img:require('../assets/images/egg_01.png')
}

let integralEgg = {
	type:'integral',
	egbg:require('../assets/images/egg-bg-02.jpg'),
	img:require('../assets/images/egg_02.png')
}
let freeEgg = {
	type:'free',
	egbg:require('../assets/images/egg-bg-03.jpg'),
	img:require('../assets/images/egg_03.png')
}
export class Hatch extends Component {
	constructor(props) {
		super(props)
		this.state={
			dragens:[]
		}
	}
	componentWillMount(nextProps) {
		
	}
	componentDidMount() {
		console.log(this.props)
		setCurNavStyle('hatch')
	}
	render() {
		let state = this.state
		
		let dragens = state.dragens
		console.log(dragens)
		return (
			<div id="hatch">
				<div className="container_960px">
					<div className="title">
						<p>DUEL INITIATED</p>
						<p>Receive random crypto fish token to play the game. Every time you catch</p>
						<p> you will get at least one Common or better.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01">
							<CardEgg egg={nasEgg}/>
						</div>
						<div className="session_02">
							<CardEgg egg={integralEgg}/>
						</div>
						<div className="session_03">
							<CardEgg egg={freeEgg}/>
						</div>
					</div>
					<div className="pics">
						<p><span>Average to get Uncommom:  </span></p>
						<p><span>1:5——Elite / 1:50——Rare / 1:5000——Epi / 1:1000000——Legendary</span></p>
					</div>
				</div>
			</div>
		);
	}
}

