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


export class Fusing extends Component {
	constructor(props) {
		super(props)
		this.fusion = this.fusion.bind(this)
		this.state={
			dragens:[],
			byeId:'',
			stayId:'',
			loadingInnerHtml :<img className="xy-mid" alt="waiting" src={require('../assets/images/fusion.png')}/>
		}
	}
	componentDidMount(nextProps) {
		console.log(this.props)
		setCurNavStyle('my-assets')
		let that = this;

		let txhash = getQueryString(this.props.location.search,'txhash')
		let stayId = getQueryString(this.props.location.search,'stayId')
		let byeId = getQueryString(this.props.location.search,'byeId')

		this.setState({
			stayId,
			byeId
		})


		callArgs[0] = stayId
		let dragens = [];
		call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
			let dragen = JSON.parse(resp.result).m
			console.log(dragen)	

			dragens[0] = processDragen(dragen,stayId,'fusion')
	
			callArgs[0] = byeId
			call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
				let dragen = JSON.parse(resp.result).m
				dragens[1] = processDragen(dragen,byeId,'fusion')
				that.setState({
					dragens:dragens
				})
				console.log(dragens)
			})
		})
	}
	fusion(){
		let state = this.state
		callArgs[0] = state.stayId
		callArgs[1] = state.byeId
		console.log(state)
		pay(contractAddress, 0, 'feed',callArgs, (resp) =>{
			this.setState({
				isFusion:true
			})
			receipt(resp.txhash,(resp)=>{
				const location = {
				  pathname: '/fused',
				  search: `?id=${state.stayId}`
				}
				history.push(location)
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
			<div id="attacking" style={{height:'860px'}}>
				<div className="container_960px">
					<div className="title" style={{color:'#f5ca65'}}>
						<p style={{marginBottom:'0'}}>FUSING</p>
						<p>Fuse two monsters will improve VP of the monster that you choose to save,</p>
						<p>if they are the same species ,it will give LuK addition.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01">
							<CardDragen fusion={'core'}  key={dragens[0].id} dragen={dragens[0]}  />
							<div style={{textAlign:'center',paddingBottom:'20px'}}>
								<span style={{display:'inline-block','width':'94px',height:'30px',color:'#0cd8f7'}}>core</span>
							</div>
						</div>
						<div className="session_02">
							<img className="x-mid vs-icon" alt="vs " src={require('../assets/images/fusing-texiao.png')}/>
							<div className="x-mid" style={{top:'500px',display:`${state.isFusion?'block':'none'}`}} >
							 	<Loading loadingStyle={{width:'56px',height:'56px',lineHeight:'56px',textAlign:'center'}} loadingInnerHtml={state.loadingInnerHtml} />
							</div>
							<div className="x-mid" onClick={(e) =>{this.fusion()}} style={{top:'650px',width:'176px',height:'50px',backgroundColor:'#cf6b13',color:'#fff',fontSize:'20px',lineHeight:'50px',cursor:'pointer'}}>GO</div>
						</div>
						<div className="session_03">
							<CardDragen fusion={'material'}  key={dragens[1].id} dragen={dragens[1]} />
							<div style={{textAlign:'center'}}>
								<span  style={{display:'inline-block','width':'94px',height:'30px',color:'#fff'}}>material</span>
							</div>
						</div>
					</div>
					<div className="pics">
						<p >After the success of this fusion,<span style={{color:'rgb(12, 216, 247)'}}>the material monster</span> (on the right) will <span style={{color:'rgb(12, 216, 247)'}}>disappear(Irreversible)</span></p>
						<br/>
						<p>(Tips: It takes about<span> 30 seconds</span> to<span>  2 minutes</span>)</p>
					</div>
				</div>
			</div>
		);
	}
}
