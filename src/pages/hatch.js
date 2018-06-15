import React, { Component } from 'react';

import {setCurNavStyle,rmLoading,addLoading} from '../utils/api.js'
import {CardEgg} from '../components/card'

import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()


let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt

let callArgs = []




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
		this.getOneEgg = this.getOneEgg.bind(this)
		this.getTenEgg = this.getTenEgg.bind(this)
		// this.getIntegralEgg = this.getIntegralEgg.bind(this)
		this.getFreeEgg = this.getFreeEgg.bind(this)
		this.state={
			dragens:[],
			freeCnt:0
		}
	}
	componentWillMount(nextProps) {
		
	}
	componentDidMount() {
		addLoading()
		setCurNavStyle('hatch')
		this.setState({
			freeCnt : window.freeCnt
		})
		rmLoading()
		
	}
	getOneEgg(){
		console.log('1 hatch')
		pay(contractAddress, 0.01, 'bp',callArgs, (resp)=>{
			const location = {
			  pathname: '/hatching',
			  state: { fromDashboard: true },
			  search: `?txhash=${resp.txhash}&hatchType=one`
			}
			history.push(location)
		})
	}
	getTenEgg(){
		console.log('10 hatch')
		pay(contractAddress, 0.1, 'bm',callArgs, (resp)=>{
			const location = {
			  pathname: '/hatching',
			  search: `?txhash=${resp.txhash}&hatchType=ten`
			}
			history.push(location)
		})
	}
	getIntegralEgg(){
		console.log('integral hatch')
		pay(contractAddress, 0, 'bornFen',callArgs, (resp)=>{
			const location = {
			  pathname: '/hatching',
			  search: `?txhash=${resp.txhash}&hatchType=integral`
			}
			history.push(location)
		})
	}
	getFreeEgg(){
		console.log('free hatch')
		pay(contractAddress, 0, 'bf',callArgs, (resp)=>{
			const location = {
			  pathname: '/hatching',
			  search: `?txhash=${resp.txhash}&hatchType=free`
			}
			history.push(location)
		})
	}
	render() {
		let state = this.state
		
		let dragens = state.dragens
		console.log(dragens)
		return (
			<div id="hatch">
				<div className="container_960px">
					<div className="title">
						<p>HATCH</p>
						<p>Hatch Your Monster: Monster tamer gives one random crypto monster for free, player can use 0.01</p>
						<p>NAS to buy monster egg and use your integration to redeem the special egg as well.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01">
							<CardEgg getOneEgg={this.getOneEgg} getTenEgg={this.getTenEgg} egg={nasEgg}/>
						</div>
						<div className="session_02">
							<CardEgg  getIntegralEgg={this.getIntegralEgg.bind(this)}  egg={integralEgg}/>
						</div>
						<div className="session_03">
							<CardEgg  btnDisable={state.freeCnt} getFreeEgg={this.getFreeEgg} egg={freeEgg}/>
						</div>
					</div>
					<div className="pics">
						
					</div>
				</div>
			</div>
		);
	}
}

