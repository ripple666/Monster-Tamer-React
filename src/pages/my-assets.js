import React, { Component } from 'react';
import { Pagination } from 'element-react'

import {setCurNavStyle,processDragen,sortObj,showModal,noteSellDragen,sellDragen,alertMyDragens,addLoading,rmLoading} from '../utils/api.js'
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



const nav = {
	id:"test",
	title:'ORDER',
	navs:[
		{
			name:'MONSTER',
			id:'monster'
		},
		{
			name:'ITEM',
			id:'item'
		}
		
	]
}



export class MyAssets extends Component {
	constructor(props) {
	    super(props);
	    this.changeNav = this.changeNav.bind(this)
	    this.dragenCardBtnClick = this.dragenCardBtnClick.bind(this)
	    this.medicineCardBtnClick = this.medicineCardBtnClick.bind(this)
	    this.changeSelect = this.changeSelect.bind(this)
	    this.pageChange = this.pageChange.bind(this)
	    console.log('assets------------')
	    this.state={
	    	render:false,
	    	myDragens:[],
	    	myMedicines:[],
	    	isFusion:false,
	    	dragens:[],
	    	showPage:false,
	    	medicines:[],
	    	curTab:'monster',
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50,//总共多少个
	    	select : {
				id:"test",
				title:'ORDER',
				options:[
					{
						name:'NEW',
						value:'born'
					},
					{
						name:'VP',
						value:'weight'
					}
					
				]
			}
	    }
	}

	componentWillUnmount(){
		window.stop()
	}
	componentDidMount() {
		
		addLoading()

		setCurNavStyle('my-assets')

		
		call(contractAddress, 0, 'me',callArgs, (resp) =>{
			let result = JSON.parse(resp.result)
			//获取所有自己龙的列表
			callArgs[0] = result
			call(contractAddress, 0, 'getUserMonster',callArgs, (resp) =>{

				let result = JSON.parse(resp.result)

				var idData = result.data;

				var dragens = []
				for(let key in idData){
					if(idData[key].dp){  //过滤已经死亡的龙
						return
					}
					dragens.push(processDragen(idData[key],key,'assets'))
				}


				

				let total = Math.ceil(dragens.length / 12)
				this.setState({
					myDragens:dragens,
					DragenTotal:dragens.length,
					showPage:true,
					render:true
				})
				this.getDragens(1)

				rmLoading()
			})

			//获取所有自己道具列表
			callArgs = new Array()
			call(contractAddress, 0, 'getUserSC',callArgs, (resp) =>{

				let result = JSON.parse(resp.result)

				console.log(result)
				if(result && result.sc){
					var medicinesObj_sc = result.sc;
					var medicinesList = []
					for(let key in medicinesObj_sc){
						// let medicinesObj = medicinesObj[key];
						// medicinesObj.from = 'assets'
						medicinesObj[key].from = 'assets'
						medicinesList.push(medicinesObj[key])
					}
					// medicinesList.forEach(())
					let total = Math.ceil(medicinesList.length / 12)
					this.setState({
						myMedicines:medicinesList,
						MedicineTotal:total
					})
					
					// this.getMedicines(1)
				}
			})
		})
	}

	changeNav(id){ 
		console.log(id)
		if(id==='monster'){
			this.getDragens(1)
			this.setState({
				curTab:'monster',
				showPage:true,
				showSelect:true
			})
		}else{
			this.getMedicines(1)
			this.setState({
				curTab:'item',
				showPage:false,
				showSelect:false
			})
		}
		
		
	}
	getDragens(index){
        let all_log = this.state.myDragens.slice((index - 1) * 12, index * 12)
        this.setState({
			dragens:all_log,
			total:this.state.DragenTotal
		})
	}
	getMedicines(index){
		if(this.state.myMedicines.length){
			let all_log = this.state.myMedicines.slice((index - 1) * 12, index * 12)
			this.setState({
				medicines:all_log,
				total:this.state.MedicineTotal
			})
		}
		
	}
	pageChange(index){
		if(this.state.curTab === 'monster'){
			this.getDragens(index)
		}else{
			
			this.getMedicines(index)
		}
		
	}
	changeSelect(value){
		let state = this.state;
		console.log(value)
		if( state.curTab === 'monster'){
			let myDragens = state.myDragens
			myDragens = myDragens.sort((a,b) =>{
				return b[value] - a[value] 
			})
			console.log(myDragens)
			this.setState({
				myDragens:myDragens
			})
			this.getDragens(1)
		}
	}

	dragenCardBtnClick(id,onsale,fusion){
		callArgs = new Array()
		callArgs[0] = id;
		if(fusion){
			let htmlTemplate = '';
			this.state.myDragens.forEach((v,i) =>{
				if(v.id === id || v.onsale){ //不显示当前的龙
					return
				}
				htmlTemplate += `			
						<div >
							<span>${v.name}</span>
							<span class="modal-content-sub" data-id="${v.id}">choose</span>
						</div>
				`
			})
			let config = {
				title:'选择材料',
				content:'选择材料',
				htmlTemplate:htmlTemplate,
				single:true
			}

			alertMyDragens(id,this.state.myDragens,false,(chooseid) =>{
				console.log(id)
				
				const location = {
				  pathname: '/fusing',
				  search: `?stayId=${id}&byeId=${chooseid}`
				}
				history.push(location)
			},{
				intro:'WARNING:Select the donar monster will disapppear foever,this process can\'t be reverse',
				title:'FUSION'
			})
			return
		}else{
			if(!onsale){
				sellDragen(id)
			}else{
				noteSellDragen(id)
			}
		}		
	}

	medicineCardBtnClick(id){
		callArgs = new Array()
		console.log(id)
		alertMyDragens(0,this.state.myDragens,false,(chooseid) =>{
			console.log(chooseid)
			callArgs[0] = id
			callArgs[1] = chooseid
			pay(contractAddress, 0, 'useSC',callArgs, (resp)=>{
				Message({
			      type: 'success',
			      message: '操作成功!'
			    });
			})
		})
	}


	render() {
		let state = this.state
		let content ;
		if(!state.render){
			return <div></div>
		}
		switch(state.curTab){
			case 'monster':
				if(state.dragens.length === 0){
					content = <div style={{display:'flex',textAlign:'center'}}>
								<img src={require('../assets/images/no-egg.png')}  />
								<div className="right no-egg">
									<div>
									 1. TRY TO HATCH ONE 
									</div>
								 	<div>
									 	<a href="/#/hatch"><span className="btn">HATCH</span></a>
									</div>
									
									<div className="line"></div>

									<div>
									 2. BUY FROM OTHER PLAYERS ON THE MARKET
									</div>
								 	<div>
									 	<a href="/#/market"><span  className="btn">MARKET</span></a>
									</div>
								</div>
							</div>
				}else{
					content= <div className="content clearfloat">
						{
							this.state.dragens.map((dragen) =>
								<CardDragen  dragenCardBtnClick={this.dragenCardBtnClick}   isFusion={state.isFusion} key={dragen.id} dragen={dragen}   />
							)
						}
					</div>
				}
				
				break;
			case 'item' :
				if(state.medicines.length === 0){
					content = <div className="content clearfloat" style={{textAlign:'center',fontSize:'20px',paddingTop:'120px',color:'rgb(245, 202, 101)'}}>
							You don't have any booster.
						</div>	
				}else{
					content= <div className="content clearfloat">
								{state.medicines.map((medicine) =>
									<CardMedicine  medicineCardBtnClick={this.medicineCardBtnClick} key={medicine.id}  medicine={medicine} />
								)}
						</div>
				}
				
			
				break;
			default: 
				content=  <div>
				</div>
				break;
		}

		return (
			<div id="assets">
				<div className="main-top">
					<div className="container_960px">
						<Mynav nav={nav} onNav={this.changeNav} ></Mynav>
						<div className="top-right" style={this.state.showPage === false ? { display:'none'} :{}}>
							<span className="label">ORDER:</span>
							<Myselect  select={state.select} onSelect={this.changeSelect}></Myselect>
						</div>
					</div>
				</div>
				<div className="container_960px" id="fill-cont">
					
					{content}
					<div className="pages" style={this.state.showPage === false ? { display:'none'} :{}}>
						<div className="label">PAGES</div>
						<Pagination  currentPage={state.currentPage} onCurrentChange={this.pageChange} pageSize={state.pageSize} layout="prev, pager, next" total={state.total}/>
					</div>
				</div>
			</div>
		);
	}
}
