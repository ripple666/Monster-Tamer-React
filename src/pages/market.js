import React, { Component } from 'react';
import { Pagination } from 'element-react'

import {setCurNavStyle,processDragen,buyDragen,rmLoading,addLoading} from '../utils/api.js'
import {medicines,medicinesObj} from '../assets/data/data.js'

import {Myselect} from '../components/pics/select'
import {Mynav} from '../components/pics/nav'
import {CardDragen ,CardMedicine} from '../components/card.js'


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
			name:'Market',
			id:'market'
		},
		{
			name:'ITEM',
			id:'item'
		}	
	]
}


const changeSelect = (id)=>{
	console.log(id)
}

export class Market extends Component {
	constructor(props) {
	    super(props);
	    this.changeNav = this.changeNav.bind(this)
	    this.dragenCardBtnClick = this.dragenCardBtnClick.bind(this)
	    this.medicineCardBtnClick = this.medicineCardBtnClick.bind(this)
	    this.state={
	    	dragens:[],
	    	medicines:[],
	    	curTab:'market',
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50//总共多少页
	    }
	}

	componentWillMount(){
		
	}

	componentDidMount() {
		addLoading()
		setCurNavStyle('market')
		let that = this;

		callArgs = new Array()
		callArgs[0] = 0
		callArgs[1] = {sl:'1'}
		callArgs[2] = 1000000
		call(contractAddress, 0, 'getMConditions',callArgs, (resp)=>{
			let result = JSON.parse(resp.result)

			var idData = result.m;
			
			var dragens = []
			for(let key in idData){
				// if(idData[key].ow === window.userAddress){  //过滤已经死亡的龙
				// 	return
				// }
				dragens.push(processDragen(idData[key],key,'market'))
			}
			
			that.setState({
				Marketdragens:dragens
			})

			// this.setState({
			// 	dragens:dragens
			// })
			this.getDragens(1)
			this.getMedicines(1)
			rmLoading()
		})
	}


	getDragens(index){
		
		let all_log = this.state.Marketdragens.slice((index - 1) * 12, index * 12)
        this.setState({
			dragens:all_log,
			total:this.state.Marketdragens.length
		})
	}

	getMedicines(){
		this.setState({
			medicines:medicines
		})
	}

	changeNav(id){ 
		this.setState({
			curTab:id
		})
	}

	pageChange(index){
		console.log(index)
	}
	dragenCardBtnClick(id,price){
		console.log(id)
		buyDragen(id,price)
	}
	medicineCardBtnClick(id){
		console.log(id)
		let price = medicinesObj[id].price
		callArgs = new Array()
	  	callArgs[0] = id

	    pay(contractAddress, price, 'buySC',callArgs, (resp)=>{

	    })
	}


	render() {
		let state = this.state
		let content ;
		switch(state.curTab){
			case 'market':
				content= <div className="content clearfloat">
					{
						this.state.dragens.map((dragen) =>
							<CardDragen  dragenCardBtnClick={this.dragenCardBtnClick}    key={dragen.id} dragen={dragen}   />
						)
					}
				</div>
				break;
			case 'item' :
				content= <div className="content clearfloat">
					{state.medicines.map((medicine) =>
						<CardMedicine  medicineCardBtnClick={this.medicineCardBtnClick} key={medicine.id}  medicine={medicine} />
					)}
				</div>
				break;
			default: 
				content=  <div>
				</div>
				break;
		}
		return (
			<div id="market">
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
