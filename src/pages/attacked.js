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

export class Attacked extends Component {
	constructor(props) {
		super(props)
		this.state={
			dragens:[],
			deffendResult:{
				name:'',
				add:''
			},
			attackResult:{
				name:'',
				add:''
			}
		}
	}
	componentWillMount(nextProps) {
		
	}
	componentDidMount() {
		setCurNavStyle('attack')
		

		console.log(this.props)
		setCurNavStyle('attack')
		var that = this;
		let attackId = getQueryString(this.props.location.search,'attackId')
		let defendId = getQueryString(this.props.location.search,'defendId')



		callArgs[0] = attackId
		let dragens = [];
		call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
			let dragen = JSON.parse(resp.result).m
			


			dragens[0] = processDragen(dragen,attackId,'attacked')
	
			callArgs[0] = defendId
			call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
				let dragen = JSON.parse(resp.result).m
				dragens[1] = processDragen(dragen,defendId,'attacked')
				that.setState({
					dragens:dragens
				})

				callArgs[0] = attackId
				console.log(callArgs)
				call(contractAddress, 0, 'getMonsterFightLog',callArgs, (resp) =>{
					let result = JSON.parse(resp.result)
					console.log(result)
					if(result instanceof Object){
						let fightId = result.max_log_id
						let log = result.msg[fightId]
						// for()
						
						var logArr = log.split('|')
						if(logArr[15] === 'a'){
							this.setState({
								attackResult:{
									name:'WINNER',
									add:'+'+ parseFloat(Math.abs(logArr[16])).toFixed(2)+ ' VP'
								},
								deffendResult:{
									name:'LOST',
									add:'-' + parseFloat(Math.abs(logArr[16])).toFixed(2)+' VP'
								}
							})
						}else{
							this.setState({
								attackResult:{
									name:'LOST',
									add:'-'+ parseFloat(Math.abs(logArr[16])).toFixed(2)+ ' VP'
								},
								deffendResult:{
									name:'WINNER',
									add:'+' + parseFloat(Math.abs(logArr[16])).toFixed(2)+' VP'
								}
							})
						}
					}
				

				})
			})
		})
	}
	getDragens(){
		
		
	}
	render() {
		let state = this.state
		
		let dragens = state.dragens
		console.log(dragens)
		if(!dragens.length){
			return (
				<div id="attacking" style={{height:'860px'}}>
				</div>

			)
		}
		return (
			<div id="attacked">
				<div className="container_960px">
					<div className="title">
						<p>DUEL</p>
						<p>Choose your rival and crypto monster will be sent to Arena.</p>
						<p>Please wait for it to be included in the blockchain to get results of the duel.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01">
							<CardDragen result_2v2={state.attackResult}  key={dragens[0].id} dragen={dragens[0]}  />
						</div>
						<div className="session_02">
							<img className="x-mid vs-icon" alt="vs " src={require('../assets/images/VS.png')}/>
						</div>
						<div className="session_03">
							<CardDragen result_2v2={state.deffendResult}  key={dragens[1].id} dragen={dragens[1]} />
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
