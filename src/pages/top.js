import React, { Component } from 'react';
import { Pagination } from 'element-react'

import {setCurNavStyle,processDragen,buyDragen,addLoading,rmLoading} from '../utils/api.js'
import {medicines,medicinesObj} from '../assets/data/data.js'

import {Myselect} from '../components/pics/select'
import {Mynav} from '../components/pics/nav'
import {CardDragen ,CardMedicine} from '../components/card.js'

import { Link } from 'react-router-dom';
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

const nav = {
	id:"test",
	title:'ORDER',
	navs:[
		{
			name:'top',
			id:'top'
		}	
	]
}


const changeSelect = (id)=>{
	console.log(id)
}

export class Top extends Component {
	constructor(props) {
	    super(props);
	    this.changeNav = this.changeNav.bind(this)
	    this.pageChange = this.pageChange.bind(this)
	    this.dragenCardBtnClick = this.dragenCardBtnClick.bind(this)
	    this.state={
	    	Alldragens:[],
	    	dragens:[],
	    	medicines:[],
	    	curTab:'top',
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50//总共多少页
	    }
	}

	componentWillMount(){
		this.getDragens(1)

	}

	componentDidMount() {
		setCurNavStyle('top')

		addLoading()
		let that = this;

		callArgs = new Array()
		callArgs[0] = 0
		callArgs[1] = {}
		callArgs[2] = 1000000
		call(contractAddress, 0, 'getMConditions',callArgs, (resp)=>{
			let result = JSON.parse(resp.result)

			var idData = result.m;
			
			var dragens = []
			for(let key in idData){
				// if(idData[key].ow === window.userAddress){  //过滤已经死亡的龙
				// 	return
				// }
				dragens.push(processDragen(idData[key],key,'top'))
			}
			dragens.sort((a,b) =>{
				return b.weight - a.weight
			})
			dragens.forEach((v,i) =>{
				v.rank = i+1
			})
			console.log(dragens)
			that.setState({
				Alldragens:dragens
			})
			this.getDragens(1)
			rmLoading()
		})
	}

	changeNav(id){ 
		this.setState({
			curTab:id
		})
	}

	pageChange(index){
		this.getDragens(index)
	}
	dragenCardBtnClick(id){
		console.log(id)
	}
	medicineCardBtnClick(id){
		console.log(id)
	}

	getDragens(index){
		let all_log = this.state.Alldragens.slice((index - 1) * 12, index * 12)
        this.setState({
			dragens:all_log,
			total:this.state.Alldragens.length
		})
	}

	render() {
		let state = this.state
		let content ;
		switch(state.curTab){
			case 'top':

				
				content= <div className="content clearfloat">
					{
						state.dragens.map((dragen) =>{

							let rankStyle ;
							let shapeBgStyle;
							switch(dragen.rank){
								case 1:
									rankStyle = {background:`url(${require('../assets/images/top_1.png')}) center / cover no-repeat`,color:'transparent'}
									shapeBgStyle = {background:`url(${require('../assets/images/top_1_bg.png')}) 150px 50%/100% 100%  no-repeat`}
									break;
								case 2:
									rankStyle = {background:`url(${require('../assets/images/top_2.png')}) center / cover no-repeat` ,color:'transparent'}
									shapeBgStyle = {background:`url(${require('../assets/images/top_2_bg.png')})  150px 50%/100% 100% no-repeat`}
									break;
								case 3:
									rankStyle = {background:`url(${require('../assets/images/top_3.png')}) center / cover no-repeat`,color:'transparent'}
									shapeBgStyle = {background:`url(${require('../assets/images/top_3_bg.png')})  150px 50%/100% 100% no-repeat`}
									break;
								default:
									rankStyle = {background:`url(${require('../assets/images/top_n.png')})  center /100% 100% no-repeat`,textAlign:'center',fontSize:'42px',color:'#fff',lineHeight:'78px'}
									shapeBgStyle ={}
									break;
							}
							return(<div className="dragen-top clearfloat" key={dragen.id} >
								<div className="rank">
									<div className="rank-info" style={rankStyle}>
										{
											dragen.rank
										}
									</div>
								</div>
								<div className="info">
									<CardDragen  dragenCardBtnClick={this.dragenCardBtnClick}    key={dragen.id} dragen={dragen}   />
								</div>
								<div className="shape" style={shapeBgStyle} >
									<Link to={{pathname:`/info`,search:`?id=${dragen.id}`,}}><img   className="dragen" src={dragen.dragenImg}/></Link>
									<img alt="shield" className="shield" style={dragen.buffs.includes('shield') ?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
								</div>
							</div>)
						})
					}
				</div>
				break;
			default: 
				content = <div>

						</div>
				break;
		}
		return (
			<div id="top">
				<div className="main-top">
					<div className="container_960px">
						<Mynav nav={nav} onNav={this.changeNav} ></Mynav>
						
					</div>
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
// 	<Myselect select={select} onSelect={changeSelect}></Myselect>
// </div>