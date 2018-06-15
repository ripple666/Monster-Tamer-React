import React, { Component } from 'react';
import { Pagination } from 'element-react'

import {setCurNavStyle,processDragen,sortObj,showModal,getMyDragens,alertMyDragens,alertMyMultiDragens,processMultiDragen,filterMyTeam,rmLoading,addLoading} from '../utils/api.js'
import {medicines,medicinesObj} from '../assets/data/data.js'

import {Myselect} from '../components/pics/select'
import {Mynav} from '../components/pics/nav'
import {CardDragen,CardMultiDragen} from '../components/card.js'
import { MessageBox,Message } from 'element-react';
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()

let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()

let $ = window.$


const select = {
	id:"test",
	title:'ORDER',
	options:[
		{
			name:'NEW',
			id:1
		},
		{
			name:'NEW FIRSTFIRSTFIRST',
			id:0
		},
		{
			name:'NEW FIRST',
			id:2
		},
		{
			name:'NEW FIRST',
			id:3
		},
		{
			name:'NEW FIRST',
			id:4
		}
		
	]
}

let nav1 = '1v1'
let nav2 = '3v3'

const nav = {
	id:"test",
	title:'ORDER',
	navs:[
		{
			name:nav1,
			id:nav1
		},
		{
			name:nav2,
			id:nav2
		}	
	]
}




export class Attack extends Component {
	constructor(props) {
	    super(props);
	    this.changeNav = this.changeNav.bind(this)
	    this.multiAttack = this.multiAttack.bind(this)
	    this.jionTeam = this.jionTeam.bind(this)
	    this.pageChange = this.pageChange.bind(this)
	    this.getMyTeams = this.getMyTeams.bind(this)
	    this.dragenCardBtnClick = this.dragenCardBtnClick.bind(this)
	    this.state={
	    	AttackDragens:[],
	    	alMmultiDragens:[],
	    	AllMyTeam:[],
	    	multiDragens:[
	    		{
	    			id:0,
	    			dragens:[
	    				{
							from:'attack',
							name:'triceratops',
							type:'common',
							buffs:['shield','strong'], //龙的buff
							status:[
								{
									name:'freeze',
									time:'21:03',
									effect:'Power Boost'
								},
								{
									name:'shield',
									time:'21:26',
									effect:'Power Boost'
								},
								{
									name:'strong',
									time:'10:02',
									effect:'Power Boost'
								}
							],
							onsale:true,
							VG:'2023.02',
							dragenImg:require('../assets/images/dragen_demo.png'),
							property:{
								luyck:52,
								speed:18,
								power:1,
								agility:18
							},
							owner:'suerjoieawuguhagwiuejfoisuerjoieawuguhagwiuejfoiewew',
							price:'1.20',
							id:0
						},
						{
							from:'attack',
							name:'triceratops',
							type:'rare',
							buffs:['shield','strong'], //龙的buff
							status:[
								{
									name:'freeze',
									time:'21:03',
									effect:'Power Boost'
								},
								{
									name:'shield',
									time:'21:26',
									effect:'Power Boost'
								},
								{
									name:'strong',
									time:'10:02',
									effect:'Power Boost'
								}
							],
							onsale:true,
							VG:'2023.02',
							dragenImg:require('../assets/images/dragen_demo.png'),
							property:{
								luyck:52,
								speed:18,
								power:1,
								agility:18
							},
							owner:'suerjoieawuguhagwiuejfoisuerjoieawuguhagwiuejfoiewew',
							price:'1.20',
							id:1
						}
	    			]
	    		}
	    	],
	    	dragens:[],
	    	curTab:nav1,
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50,//总共多少页
	    	select:{
				id:"test",
				title:'ORDER',
				options:[
					{
						name:'new',
						value:'tm'
					},
					{
						name:'power',
						value:'power'
					}
					
				]
			}
	    }
	   
	}

	componentDidMount() {
		setCurNavStyle('attack')

		let that = this;
		addLoading()
		getMyDragens((dragens) =>{  //获取自己所有的龙
			that.setState({
				myDragens:dragens
			})
		})

		callArgs = new Array()
		callArgs[0] = 0
		callArgs[1] = {dp:0,pt:0,ft:1}
		callArgs[2] = 100000;
		call(contractAddress, 0, 'getMConditions',callArgs, (resp)=>{
			let result = JSON.parse(resp.result)

			var idData = result.m;
			
			var dragens = []
			for(let key in idData){
				// if(idData[key].ow === window.userAddress){  //过滤已经死亡的龙
				// 	return
				// }
				dragens.push(processDragen(idData[key],key,'attack'))
			}
			
			dragens= dragens.filter((v,i) =>{
				return v.owner != window.userAddress && v.dtm_cd_end<window.bkctime
			})
			that.setState({
				AttackDragens:dragens,
				AttackTotal:dragens.length
			})
			rmLoading()
			that.getDragens(1)
		})





		/**
		 * 获取所有战队
		 * @type {Array}
		 */
		callArgs = new Array()
		callArgs[0] = 1
		callArgs[1] = 100000
		call(contractAddress, 0, 'getTeamDetail',callArgs, (resp)=>{
			let result = JSON.parse(resp.result)

			var data = result.data;
			console.log(data)
			that.setState({
				alMmultiDragens : processMultiDragen(data,'all')
			})

			that.getDragens(1)
		})
		

		/**
		 * 获取所有自己龙的战队
		 * @type {Array}
		 */
		callArgs = new Array()
		call(contractAddress, 0, 'getUserTeamDetail',callArgs, (resp)=>{
			let result = JSON.parse(resp.result)

			var data = result.data.tlist;
			
			console.log(result.data.cnt)
			console.log()
			if(result.data.cnt>0){
				this.setState({
					AllMyTeam : processMultiDragen(data,'me')
				})
				
			}
			// that.getDragens(1)
		})
	}

	changeNav(id){ 
		console.log(id)
		if(id==='1v1'){
			addLoading()
			this.getDragens(1)
			this.setState({
				curTab:'1v1'
			})
		}else{
			addLoading()
			this.getTeams(1)
			this.setState({
				curTab:'3v3'
			})
		}
	}
	componentWillUnmount(){
		window.stop()
	}
	pageChange(index){
		if(this.state.curTab === '1v1'){
			this.getDragens(index)
		}else if(this.state.curTab === '3v3'){
			
			this.getTeams(index)
		}else if('my-team'){
			this.getMyTeams(index)
		}
		
	}
	changeSelect(value){
	}

	dragenCardBtnClick(id){
		let myDragens = this.state.myDragens
		myDragens = myDragens.filter((v,i)  =>{
			return v.atk_cd_end < window.bkctime
		})
		alertMyDragens(id,myDragens,false,null,{intro:'You need to select one monster',title:'select monster'})	
	}
	
	multiAttack(deffendId){
		
		alertMyMultiDragens(deffendId,this.state.AllMyTeam,false,(attackId) =>{
			console.log(attackId)
			
		   	callArgs = new Array()
			callArgs[0] = attackId
			callArgs[1] = deffendId
			pay(contractAddress, 0, 'fightTeam',callArgs, (resp)=>{
				let txhash = resp.txhash
				let location = {
					pathname:'/multi-attacking',
					search:`?txhash=${txhash}&attackId=${attackId}&deffendId=${deffendId}`
				}
				history.push(location)
			})
			
		},{
			intro:'You need to select one team',title:'select team'
		})
	}
	jionTeam(teamId){
		let myDragens = this.state.myDragens;
		myDragens = myDragens.filter((v,i)=>{
			return v.inTeam == 0
		})
		alertMyDragens(false,this.state.myDragens,false,(dragenId) =>{

		  	callArgs = new Array()
			callArgs[0] = dragenId
			callArgs[1] = teamId
			pay(contractAddress, 0, 'joinTeam',callArgs, (resp)=>{

			})

		},{
			intro:'You need to select one monster to join in',title:'select monster'
		})	
	}
	filterMyTeam(){
		this.setState({
				curTab:'my-team'
		})

		this.getMyTeams(1)
	}

	getDragens(index){
		let all_log = this.state.AttackDragens.slice((index - 1) * 12, index * 12)
        this.setState({
			dragens:all_log,
			total:this.state.AttackTotal
		})
		rmLoading()
	}
	
	
	getMyTeams(index){
		
		let all_log = this.state.AllMyTeam.slice((index - 1) * 12, index * 12)
		console.log(all_log)
		 this.setState({
			multiDragens:all_log,
			total:this.state.AllMyTeam.length
		})
	}
	getTeams(index){
		let all_log = this.state.alMmultiDragens.slice((index - 1) * 12, index * 12)
		console.log(all_log)
        this.setState({
			multiDragens:all_log,
			total:this.state.alMmultiDragens.length
		})
		rmLoading()
	}
	createTeam(){
		// createTeam: function(mid, name, min)
		alertMyDragens(false,this.state.myDragens,false,(id) =>{
			// console.log(id)
			// MessageBox.prompt('team name', 'tips', {
			//     inputPattern: /[\w\u4e00-\u9fa5]/,
			//     inputErrorMessage: ''
			// }).then(({ value }) => {
			   	callArgs = new Array()
				callArgs[0] = id
				callArgs[1] = ''
				callArgs[2] = 1
				pay(contractAddress, 0, 'createTeam',callArgs, (resp)=>{

				})
			// }).catch(() => {
			  
			// });
		},{
			intro:'Select one monster you want to create a team',title:'select monster'
		})	
	}
	render() {
		let state = this.state
		// let props = this.props
		let content ;
		switch(state.curTab){
			case nav1:
				content= <div className="content clearfloat">
					{
						state.dragens.map((dragen) =>
							<CardDragen dragenCardBtnClick={this.dragenCardBtnClick}  key={dragen.id} dragen={dragen}   />
						)
					}
				</div>
				break;
			case nav2 :
				content= <div className="content clearfloat">
					{state.multiDragens.map((multiDragen,i) =>
						<CardMultiDragen jionTeam={this.jionTeam} multiAttack={this.multiAttack} multiDragen={multiDragen} key={multiDragen.id}   />
					)}
				</div>
				break;
			case 'my-team' :
				content= <div className="content clearfloat">
					{state.multiDragens.map((multiDragen,i) =>
						<CardMultiDragen  jionTeam={this.jionTeam} multiAttack={this.multiAttack} multiDragen={multiDragen} key={multiDragen.id}   />
					)}
				</div>
				break;
			default: 
				content= <div>
					</div>
				break;
		}
		return (
			<div id="attack">
				<div className="main-top">
					<div className="container_960px">
						<Mynav nav={nav} onNav={this.changeNav} ></Mynav>
						
					</div>
				</div>
				<div className="container_960px create-team" style={state.curTab === '1v1'?{display:'none'}:{}} >
					<div onClick={e =>{this.createTeam()}}><img src={require('../assets/images/haojiao.png')}/><span>create team</span></div>
					<div onClick={e =>{this.filterMyTeam()}} style={{float:'right'}}><span>my team</span></div>
				</div>
				<div className="container_960px">
					{content}
					<div className="pages">
						<div className="label">PAGES</div>
						<Pagination  currentPage={state.currentPage} onCurrentChange={this.pageChange} pageSize={state.pageSize} layout="prev, pager, next" total={state.total}/>
					</div>
				</div>
				
			</div>
		);
	}
}

// <div className="top-right">
// 	<span className="label">ORDER:</span>
// 	<Myselect select={state.select} onSelect={this.changeSelect}></Myselect>
// </div>