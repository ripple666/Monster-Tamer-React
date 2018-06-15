import React, { Component } from 'react';
import { Pagination } from 'element-react'

import {setCurNavStyle,getQueryString,processDragen} from '../utils/api.js'

import {Myselect} from '../components/pics/select'
import {Mynav} from '../components/pics/nav'
import {CardDragen ,CardMedicine} from '../components/card.js'

import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()

let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()




export class Hatched extends Component {
	constructor(props) {
	    super(props);
	    this.state={
	    	dragens:[]
	    }
	}

	componentWillMount(){
	}

	componentDidMount() {
		
		setCurNavStyle('hatch')

		let that = this;
		let id = getQueryString(this.props.location.search,'id')
		if(id.indexOf(',')<0){ //单只龙
			callArgs[0] = id
			call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{
				console.log(JSON.parse(resp.result).m)
				let dragen = JSON.parse(resp.result).m
				that.setState({
					dragens:[processDragen(dragen,id,'hatched')]
				})
			})
		}else{//多只龙
			let ids = id.split(',')
			let dragens = []
			let index = 0;
			ids.forEach((v,i) =>{
				callArgs[0] = v
				call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{
					console.log(JSON.parse(resp.result).m)
					let dragen = JSON.parse(resp.result).m

					dragens.push(processDragen(dragen,v,'hatched'))

					index++

					if(index === 10){
						that.setState({
							dragens:dragens
						})
					}
					
				})
			})
		}
		
	}

	changeNav(id){ 
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

	render() {
		let state = this.state
		let content ;
		return (
			<div id="hatched">
				<div className="container_960px">
					<div className="title" style={state.dragens.length > 1?{lineHeight:'1',paddingTop:'30px'}:{}}>
						<p style={state.dragens.length === 1?{marginBottom:'0'}:{}}>CONGRATULATIONS</p>
						<p style={state.dragens.length === 1?{display:'none'}:{}}>Tips: Click on the monster to see details </p>
					</div>
					<div className="content clearfloat">
						<div style={state.dragens.length===1?{marginLeft:'330px'}:{}}>
							{
								this.state.dragens.map((dragen) =>
									<CardDragen  dragenCardBtnClick={this.dragenCardBtnClick}    key={dragen.id} dragen={dragen}   />
								)
							}
						</div>
					</div>
					<div className="pics">
						<p style={state.dragens.length>1?{display:'none'}:{}}>(Tips: Click on the monster to see details) </p>
					</div>
				</div>
			</div>
		);
	}
}
