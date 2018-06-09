import React, { Component } from 'react';
import { Pagination } from 'element-react'

import {setCurNavStyle} from '../utils/api.js'

import {Myselect} from '../components/pics/select'
import {Mynav} from '../components/pics/nav'
import {CardDragen ,CardMedicine} from '../components/card.js'




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

let nav1 = 'duel'
let nav2 = '5v5'

const nav = {
	id:"test",
	title:'ORDER',
	navs:[
		{
			name:nav1.toUpperCase(),
			id:nav1
		},
		{
			name:nav2,
			id:nav2
		}	
	]
}


const changeSelect = (id)=>{
	console.log(id)
}

export class Attack extends Component {
	constructor(props) {
	    super(props);
	    this.changeNav = this.changeNav.bind(this)
	    this.dragenCardBtnClick = this.dragenCardBtnClick.bind(this)
	    this.medicineCardBtnClick = this.medicineCardBtnClick.bind(this)
	    this.state={
	    	dragens:[],
	    	medicines:[],
	    	curTab:nav1,
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50//总共多少页

	    }
	}

	componentDidMount(){
		setCurNavStyle('attack')
	}
	componentWillMount() {
		this.getDragens(1)
		this.getMedicines(1)
	}

	changeNav(id){ 
		this.setState({
			curTab:id
		})
	}

	pageChange(index){
		console.log(index)
	}

	dragenCardBtnClick(id){
		console.log(id)
	}
	medicineCardBtnClick(id){
		console.log(id)
	}
	getDragens(){
		let dragens = [
			{
				from:'attack',
				name:'triceratops',
				type:'common',
				buffs:['shield','strong'], //龙的buff
				status:[
					{
						name:'freeze',
						time:'21:03'
					},
					{
						name:'shield',
						time:'21:26'
					},
					{
						name:'strong',
						time:'10:02'
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
				owner:'suerjoieawuguhagwiuejfoiew',
				price:'1.20',
				id:0
			}
		]
		this.setState({
			dragens:dragens
		})
	}

	getMedicines(){
		let medicines = [
			{
				id:0,
				img:require('../assets/images/medicine/Big Power Booster.png'),
				name:'Big Power Booster',
				power:'30%',
				time:'120MIN',
				effect:'Power Boost',
				price:'10.20 NAS'
			},
			{
				id:1,
				img:require('../assets/images/medicine/Medium Power Booster.png'),
				name:'Medium Power Booster',
				power:'20%',
				time:'120MIN',
				effect:'Power Boost',
				price:'5.26 NAS'
			},
			{
				id:2,
				img:require('../assets/images/medicine/Small Power Booster.png'),
				name:'Small Power Booster',
				power:'10%',
				time:'120MIN',
				effect:'Power Boost',
				price:'1.20 NAS'
			}
		]
		this.setState({
			medicines:medicines
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
						this.state.dragens.map((dragen) =>
							<CardDragen dragenCardBtnClick={this.dragenCardBtnClick}  key={dragen.id} dragen={dragen}   />
						)
					}
				</div>
				break;
			case nav2 :
				content= <div className="content clearfloat">
					{state.medicines.map((medicine) =>
						<CardMedicine medicineCardBtnClick={this.medicineCardBtnClick} key={medicine.id}  medicine={medicine} />
					)}
				</div>
				break;
			default: 
				content=  <div>
				</div>
				break;
		}
		return (
			<div id="attack">
				<div className="top">
					<div className="container_960px">
						<Mynav nav={nav} onNav={this.changeNav} ></Mynav>
						<div className="top-right">
							<span className="label">ORDER:</span>
							<Myselect select={select} onSelect={changeSelect}></Myselect>
						</div>
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
