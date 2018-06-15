import React, { Component } from 'react';


import {Loading} from '../components/loading'

import {setCurNavStyle,getQueryString,processDragen} from '../utils/api.js'
import {CardDragen} from '../components/card'

import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()


let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()



export class Attacking extends Component {
	constructor(props) {
		super(props)
		this.state={
			loadingInnerHtml :<img className="xy-mid" alt="loading" src={require('../assets/images/attack-icon.png')}/>,
			dragens:[]
		}
	}
	componentWillMount(nextProps) {
		this.getDragens()
	}
	componentDidMount() {
		console.log(this.props)
		setCurNavStyle('attack')
		var that = this;
		let txhash = getQueryString(this.props.location.search,'txhash')
		let attackId = getQueryString(this.props.location.search,'attackId')
		let defendId = getQueryString(this.props.location.search,'defendId')



		callArgs[0] = attackId
		let dragens = [];
		call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
			let dragen = JSON.parse(resp.result).m
	

			dragens[0] = processDragen(dragen,attackId,'attacking')
	
			callArgs[0] = defendId
			call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
				let dragen = JSON.parse(resp.result).m
				dragens[1] = processDragen(dragen,defendId,'attacking')
				that.setState({
					dragens:dragens
				})
				console.log(dragens)

				receipt(txhash,(resp)=>{
					const location = {
					  pathname: '/attacked',
					  search: `?attackId=${attackId}&defendId=${defendId}&txhash=${txhash}`
					}
					history.push(location)
				})	

			})
		})
	}
	getDragens(){
		
	}
	render() {
		let state = this.state
		
		let dragens = state.dragens
		if(!dragens.length){
			return (
				<div id="attacking" style={{height:'860px'}}>
				</div>

			)
		}
		return (
			<div id="attacking">
				<div className="container_960px">
					<div className="title">
						<p>DUEL</p>
						<p>Choose your rival and crypto monster will be sent to Arena.</p>
						<p>Please wait for it to be included in the blockchain to get results of the duel.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01">
							<CardDragen  key={dragens[0].id} dragen={dragens[0]}  />
						</div>
						<div className="session_02">
							<img className="x-mid vs-icon" alt="vs " src={require('../assets/images/VS.png')}/>
							<div className="x-mid" style={{top:'540px'}}>
					 			<Loading loadingStyle={{width:'56px',height:'56px',lineHeight:'56px',textAlign:'center'}} loadingInnerHtml={state.loadingInnerHtml} />
					 		</div>
						</div>
						<div className="session_03">
							<CardDragen  key={dragens[1].id} dragen={dragens[1]} />
						</div>
					</div>
					<div className="pics">
						<p>Tips:Even in the face of giants you have the opportunity to win.</p>
					</div>
				</div>
			</div>
		);
	}
}
