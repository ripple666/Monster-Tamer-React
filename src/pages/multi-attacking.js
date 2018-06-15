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



export class MultiAttacking extends Component {
	constructor(props) {
		super(props)
		this.state={
			loadingInnerHtml :<img className="xy-mid" alt="loading" src={require('../assets/images/attack-icon.png')}/>,
			dragens:[],
			defendTeam:{
				powerTotal:0,
				dragens:[]
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
		let defendId = getQueryString(this.props.location.search,'deffendId')


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
			receipt(txhash,(resp)=>{
				const location = {
				  pathname: '/multi-attacked',
				  search: `?attackId=${attackId}&defendId=${defendId}&txhash=${txhash}`
				}
				history.push(location)
			},(err) =>{
				alert(err)
			})	
		})

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
		// 									receipt(txhash,(resp)=>{
		// 										const location = {
		// 										  pathname: '/multi-attacked',
		// 										  search: `?attackId=${attackId}&defendId=${defendId}&txhash=${txhash}`
		// 										}
		// 										history.push(location)
		// 									})	
											
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

		console.log(defendTeam)
		if(!defendTeam.dragens.length){
			return (
				<div id="attacking" style={{height:'860px'}}>
				</div>

			)
		}
		return (
			<div id="multi-attacking"  style={{background:`url(${require('../assets/images/multi-attacking-bg.png')}) left top/100% 720px no-repeat`}}>
				<div className="container_960px">
					<div className="title">
						<p>3v3</p>
						<p>Receive random crypto fish token to play the game. Every time you catch </p>
						<p> you will get at least one Common or better.</p>
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

						<div className="x-mid" style={{top:'50px'}}>
						 		<Loading loadingStyle={{width:'56px',height:'56px',lineHeight:'56px',textAlign:'center'}} loadingInnerHtml={state.loadingInnerHtml} />
						</div>

						<div className="right">
							<div>team id:{defendTeam.id}</div>
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
						<p>Expected winning percentage：<span>15% </span></p>
						<p>(Tips: It takes about<span> 30 seconds</span> to<span>  2 minutes</span>)</p>
					</div>
				</div>
			</div>
		);
	}
}
