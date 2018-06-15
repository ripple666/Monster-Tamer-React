import React, { Component } from 'react';


import {Loading} from '../components/loading'

import {setCurNavStyle,getQueryString} from '../utils/api.js'
import {CardEgg} from '../components/card'

import createHashHistory from 'history/createHashHistory'

import { MessageBox,Message } from 'element-react';
const history = createHashHistory()

require('es6-promise').polyfill();
require('isomorphic-fetch');

let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()

let Materialize = window.Materialize

let eggImg ={
	nas : require('../assets/images/egg_01.png'),
	integral : require('../assets/images/egg_02.png'),
	free : require('../assets/images/egg_03.png')
}


export class Hatching extends Component {
	constructor(props) {
		super(props)
		this.state={
			loadingInnerHtml :<img className="xy-mid" alt="loading" src={require('../assets/images/egg.png')}/>,
			hatchingEgg:{},
			hatchError:false
		}
	}
	componentWillMount(nextProps) {
		// this.setState({
		// 	loadingInnerHtml :<img className="xy-mid" alt="loading" src={require('../assets/images/egg.png')}/>
		// })
		console.log('check Transaction status')


		let txhash = getQueryString(this.props.location.search,'txhash')
		let hatchType = getQueryString(this.props.location.search,'hatchType')

		let type = 'nas'
		if(hatchType === 'integral'){
			type = 'integral'
		}else if(hatchType === 'free'){
			type = 'free'
		}
		this.setState({
			hatchingEgg:{
				type:type,
				img:eggImg[type],
				hatchEggNum:hatchType === 'ten'? 10 : 1
			}
		})
		
		receipt(txhash,(resp)=>{
			console.log(resp)
			callArgs[0] = window.userAddress
			call(contractAddress, 0, 'getUser',callArgs, (resp) =>{
				let result = JSON.parse(resp.result)
				let myDragenList = result.data

				var arr = []
				for (var key in myDragenList){
					arr.push(key)
				}
				arr = arr.sort((a,b) =>{
					return a-b
				})
				if(hatchType === 'one' || hatchType=== 'integral' ||hatchType  ==='free' ){ //单个龙
					let id = arr[arr.length-1]  
					const location = {
					  pathname: '/hatched',
					  search: '?id=' + id
					}
					callArgs[0] = id

					call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
						let dragen = JSON.parse(resp.result).m
						console.log(dragen)			  	
					  	let dragenInfo = {
					      	name:dragen.name,
							id:id
					    }  
						this.drawDragenImg(dragenInfo,()=>{
							console.log('get Dragen over')
							history.push(location)
						})
					})
				}else if(hatchType === 'ten'){
					let ids = arr.slice(-10) 
					const location = {
					  pathname: '/hatched',
					  search: '?id=' + encodeURIComponent(ids.join(','))
					}
					var index = 0;
					ids.forEach((v,i) =>{
						let id = v;
						index++
						callArgs[0] = id 
						call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{ //查询龙的信息
							let dragen = JSON.parse(resp.result).m			  	
							// console.log()
						  	let dragenInfo = {
						      	name:dragen.name,
								id:id
						    }  

						    

							this.drawDragenImg(dragenInfo,()=>{
							 
							    console.log(`${index} monster`)
							})
						})
						if(index>=10){
							setTimeout(() =>{
								history.push(location)
							},10000)
							
						}
						
					})

				}
				
			})
		},()=>{
			this.setState({
				hatchError:true
			})
		})
		
	}
	drawDragenImg(dragenInfo,callback){  //绘制龙的图片
	 	function obj2params(obj) {  
		    var result = '';  
		    var item;  
		    for(item in obj){  
		        result += '&' + item + '=' +encodeURIComponent(obj[item]);  
		    }  
		  
		    if(result) {  
		        result = result.slice(1);  
		    }  
		    return result;  
		}  
		fetch(window.DragenImgUrl+'?name='+dragenInfo.name+'&id='+dragenInfo.id, {  
	        method: 'GET',  
	    }).then(res =>{
	    	callback && callback(res)
	    }).catch(err =>{
	    	callback && callback(err)
	    });

	}
	componentDidMount() {
		setCurNavStyle('hatch')
	}
	render() {
		let state = this.state
		let hatchingEgg = state.hatchingEgg

		let resultHatch;
		if(!state.hatchError){
			resultHatch = <Loading loadingStyle={{width:'56px',height:'56px',lineHeight:'56px',textAlign:'center'}} loadingInnerHtml={state.loadingInnerHtml} />
		}else{
			resultHatch =   <div style={{margin:'8px 0',fontSize:'24px',color:'#ff9518',width:'500px'}}>
								Hatch failed! Please try again! 
							</div>
		}
		return (
			<div id="hatching">
				<div className="container_960px">
					<div className="title">
						<p>HATCHING</p>
						<p>Your transaction was sent to Nebulas blockchain.The new monster will appear </p>
						<p>in "My Assets"page after it will be included in the block.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01 x-mid">
							<div className="card-egg">
								<div className="egg-pic" >
								 	<img alt="egg" src={hatchingEgg.img}/>
								</div>
								<div className="egg-info" >
							 		<div  style={{margin:'8px 0',fontSize:'30px',color:'#ff9518'}}>
							 			X{hatchingEgg.hatchEggNum} 
							 		</div>
							 		<div>
							 			{resultHatch}
							 		</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pics">
						<p>(Tips: It takes about<span> 30 seconds </span>to<span> 2 minutes</span>)</p>
					</div>
				</div>
			</div>
		);
	}
}

