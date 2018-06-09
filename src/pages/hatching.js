import React, { Component } from 'react';

import {setCurNavStyle} from '../utils/api.js'
import {CardEgg} from '../components/card'

import {Loading} from '../components/loading'

let eggImg ={
	nas : require('../assets/images/egg_01.png'),
	integral : require('../assets/images/egg_02.png'),
	free : require('../assets/images/egg_03.png')
}


export class Hatching extends Component {
	constructor(props) {
		super(props)
		this.state={
			hatchingEgg:[]
		}
	}
	componentWillMount(nextProps) {
		let type = 'nas'
		this.setState({
			loadingInnerHtml :<img className="xy-mid" alt="loading" src={require('../assets/images/egg.png')}/>,
			hatchingEgg:{
				type:type,
				img:eggImg['nas'],
				hatchEggNum:10
			}
		})
	}
	componentDidMount() {
		console.log(this.props)
		setCurNavStyle('hatch')
	}
	render() {
		let state = this.state
		let hatchingEgg = state.hatchingEgg
		return (
			<div id="hatching">
				<div className="container_960px">
					<div className="title">
						<p>HATCHING</p>
						<p>Every time you try to hatch a monster in the park, </p>
						<p>you are granted HATCH at least one Common monster or better.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01 x-mid">
							<div className="card-egg">
								<div className="egg-pic" >
								 	<img alt="egg" src={hatchingEgg.img}/>
								</div>
								<div className="egg-info" >
							 		<div  style={{margin:'8px 0',fontSize:'30px',color:'#ff9518'}}>
							 			X{hatchingEgg.hatchEggNum} 
							 		</div>
							 		<div>
							 			<Loading loadingStyle={{width:'56px',height:'56px',lineHeight:'56px',textAlign:'center'}} loadingInnerHtml={state.loadingInnerHtml} />
							 		</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pics">
						<p>(Tips: It takes about<span> 30 seconds </span>to<span> 2 minutes</span>)</p>
					</div>
				</div>
			</div>
		);
	}
}

