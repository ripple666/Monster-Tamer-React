import React, { Component } from 'react';


import {Loading} from '../components/loading'

import {setCurNavStyle,getQueryString,processDragen,processMultiDragen} from '../utils/api.js'
import {CardDragen} from '../components/card'

import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()


let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()



export class MultiAttacked extends Component {
	constructor(props) {
		super(props)
		this.state={
			loadingInnerHtml :<img className="xy-mid" alt="loading" src={require('../assets/images/attack-icon.png')}/>,
			dragens:[],
			defendTeam:{
				powerTotal:0,
				dragens:[]
			},
			attackResult:{
				name:'LOST',
				fen:'',
				integral:''
			},
			deffendResult:{
				name:'WINNER',
				fen:'',
				integral:''
			},
			attackTeam : {
				powerTotal:0,
				dragens:[]
			}
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






		let attackTeam = {
			powerTotal:0,
			dragens:[]
		};
		let defendTeam = {
			powerTotal:0,
			dragens:[]
		};


		callArgs[0] = [attackId,defendId]
		console.log(callArgs)
		call(contractAddress, 0, 'getTeamListDetail',callArgs, (resp) =>{ 
			let result = JSON.parse(resp.result)
			console.log(result)
			let data = result.data;
			let towTeam = processMultiDragen(data,'all')
			console.log(towTeam)
			
			let attackTeam = {};
			let defendTeam = {};
			towTeam.forEach((v,i) =>{
				if(v.id === attackId){
					attackTeam.id = v.id
					attackTeam.fen = v.prestige
					attackTeam.powerTotal = v.power
					attackTeam.dragens =  v.dragens
				}else{
					defendTeam.id = v.id
					defendTeam.fen = v.prestige
					defendTeam.powerTotal = v.power
					defendTeam.dragens =  v.dragens
				}
			})
			console.log(attackTeam)
			this.setState({
				attackTeam,defendTeam
			})
			
		})



		callArgs[0] = attackId
		call(contractAddress, 0, 'getTeamFightLogByTid',callArgs, (resp) =>{ //查询龙的信息
			let result = JSON.parse(resp.result)
			let log = result.data
			var logKeyArr = [];
			for(let key in log){
				logKeyArr.push(key)
			}

			logKeyArr.sort((a,b) =>{
				return b-a
			})

			let info = log[logKeyArr[0]]
			let infoArr = info.split(',')
			console.log(infoArr[4])

			let fen  = parseFloat(infoArr[5].split('|')[0]).toFixed(2)
			let integral = parseFloat(infoArr[5].split('|')[1]).toFixed(2)
			if(infoArr[4] !== 'd'){
				this.setState({
					attackResult:{
						name:'WINNER',
						fen:'+'+ fen + ' KG',
						integral:'+' + integral
					},
					deffendResult:{
						name:'LOST',
						fen:'-' + fen +' KG',
						integral:'-' + integral

					}
				})
			}else{
				this.setState({
					attackResult:{
						name:'LOST',
						fen:'-'+ fen+ ' KG',
						integral:'-' + integral
					},
					deffendResult:{
						name:'WINNER',
						fen:'+' + fen +' KG',
						integral:'+' + integral
					}
				})
			}
		})










		// let attackTeam = {
		// 	powerTotal:0,
		// 	dragens:[]
		// };
		// let defendTeam = {
		// 	powerTotal:0,
		// 	dragens:[]
		// };

		// callArgs[0] = attackId
		
		// call(contractAddress, 0, 'getTBI',callArgs, (resp) =>{ //查询战队
		// 	let result = JSON.parse(resp.result)
		// 	let dragenIdList = result.mlist

		// 	attackTeam.id = attackId
		// 	attackTeam.fen = result.fen
		// 	dragenIdList.forEach((v,i) =>{
		// 		callArgs[0] = v
		// 		call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
		// 			let dragen = JSON.parse(resp.result).m
		// 			attackTeam.powerTotal += (dragen.at*3+dragen.ag*2)*Math.sqrt(dragen.wt)
		// 			attackTeam.dragens.push(processDragen(dragen,v,'attacking')) 

		// 			if(attackTeam.dragens.length===3){
		// 				callArgs[0] = defendId
		// 				call(contractAddress, 0, 'getTBI',callArgs, (resp) =>{ //查询龙的信息
		// 					let result = JSON.parse(resp.result)
		// 					let dragenIdList = result.mlist

		// 					defendTeam.id = defendId
		// 					defendTeam.fen = result.fen
		// 					dragenIdList.forEach((v,i) =>{
		// 						callArgs[0] = v
		// 						call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
		// 							let dragen = JSON.parse(resp.result).m
		// 							defendTeam.powerTotal += (dragen.at*3+dragen.ag*2)*Math.sqrt(dragen.wt)
		// 							defendTeam.dragens.push(processDragen(dragen,v,'attacking')) 

		// 							if(defendTeam.dragens.length===3){
		// 									this.setState({
		// 										attackTeam,defendTeam
		// 									})
		// 									console.log(defendTeam)

		// 								
		// 							}
		// 						})
								
		// 					})
		// 				})
		// 			}
		// 		})
		// 		console.log(defendTeam)
		// 	})
		// })
	}
	getDragens(){
		
	}
	render() {
		let state = this.state
		let defendTeam = state.defendTeam

		console.log(state)
		if(!defendTeam.dragens.length){
			return (
				<div id="attacking" style={{height:'860px'}}>
				</div>

			)
		}
		return (
			<div id="multi-attacked"  style={{background:`url(${require('../assets/images/multi-attacking-bg.png')}) left top/100% 720px no-repeat`}}>
				<div className="container_960px ">
					<div className="attack-title">
						<div className="title">
							<div></div>
							<div>{state.attackResult.integral} <img src={require('../assets/images/integral-tag.png')}/></div>
							<div>{state.attackResult.name}</div>
						</div>
						<div className="title">
							<div></div>
							<div>{state.deffendResult.integral}  <img src={require('../assets/images/integral-tag.png')}/></div>
							<div>{state.deffendResult.name}</div>
						</div>
					</div>
				</div>

				<div className="content clearfloat" style={{height:'550px'}}>
						<div className="session_01">
							{
								state.attackTeam.dragens.map((dragen,i) =>
									 <img src={dragen.dragenImg} key={i}/>
								)
							}
						</div>
						<div className="session_02">
							<img className="x-mid vs-icon" alt="vs " src={require('../assets/images/multi-vs.png')}/>
						</div>
						<div className="session_03">
							{
								state.defendTeam.dragens.map((dragen,i) =>
									 <img src={dragen.dragenImg}  key={i}/>
								)
							}
						</div>
				</div>

				<div className="container_960px">
					<div  className="multi-info">
						<div className="left">
							<div>team id:{state.attackTeam.id}</div>
							<div>
							   <img src={require('../assets/images/mutil-power.png')} />
							   <div>
							   		<div>{state.attackTeam.powerTotal}</div>
							   		<div>team power</div>
							   </div>
							</div>
							<div>
							   <img src={require('../assets/images/prestig.png')}/>
							   <div>
							   		<div>{state.attackTeam.fen}</div>
							   		<div>prestige</div>
							   </div>
							</div>
						</div>

						

						<div className="right">
							<div>team id:{state.defendTeam.id}</div>
							<div>
							   <img src={require('../assets/images/mutil-power.png')} />
							   <div>
							   		<div>{state.defendTeam.powerTotal}</div>
							   		<div className="tip">team power</div>
							   </div>
							</div>
							<div>
							   <img src={require('../assets/images/prestig.png')}/>
							   <div>
							   		<div>{state.defendTeam.fen}</div>
							   		<div  className="tip">prestige</div>
							   </div>
							</div>
						</div>

					</div>
					<div className="pics">
						
					</div>
				</div>
			</div>
		);
	}
}
