import React, { Component } from 'react';
import { Layout } from 'element-react'
import {buffImgs,dragenTag,buffcolor,medicinesObj,timeStampToLocal} from '../assets/data/data.js'
import {Myselect} from '../components/pics/select.js'

import { Pagination } from 'element-react'

import Highcharts from 'highcharts';
import HighchartMore from 'highcharts/highcharts-more';
import HighchartsData from 'highcharts/modules/data'
import {setCurNavStyle,getQueryString,processDragen,buyDragen,getMyDragens,alertMyDragens,getBirthDay} from '../utils/api.js'

import createHashHistory from 'history/createHashHistory'
// 添加data.js
HighchartsData(Highcharts);
// 添加highcharts-more
HighchartMore(Highcharts);



const history = createHashHistory()

let contractAddress = window.contractAddress
let call = window.call
let pay = window.pay
let receipt = window.receipt
let callArgs = new Array()


Highcharts.theme = {  
        colors: ['#50B432','#058DC7',  '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],  
        chart: {  
            backgroundColor: 'transparent',  
            borderWidth: 1,  
            plotBackgroundColor: 'transparent',  
            plotShadow: true,  
            plotBorderWidth: 1  
        },  
        title: {  
            style: {  
                color: '#fff',  
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'  
            }  
        },  
        subtitle: {  
            style: {  
                color: '#fff',  
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'  
            }  
        },  
        xAxis: {  
            gridLineWidth: 1,  
            lineColor: '#000',  
            tickColor: '#000',  
            labels: {  
                style: {  
                    color: '#fff',  
                    font: '11px Trebuchet MS, Verdana, sans-serif'  
                }  
            },  
            title: {  
                style: {  
                    color: '#fff',  
                    fontWeight: 'bold',  
                    fontSize: '12px',  
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'  
  
                }  
            }  
        },  
        yAxis: {  
            minorTickInterval: 'auto',  
            lineColor: '#fff',  
            lineWidth: 1,  
            tickWidth: 1,  
            tickColor: '#fff',  
            labels: {  
                style: {  
                    color: '#fff',  
                    font: '11px Trebuchet MS, Verdana, sans-serif'  
                }  
            },  
            title: {  
                style: {  
                    color: '#fff',  
                    fontWeight: 'bold',  
                    fontSize: '12px',  
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'  
                }  
            }  
        },  
        legend: {  
            itemStyle: {  
                font: '9pt Trebuchet MS, Verdana, sans-serif',  
                color: 'fff'  
  
            },  
            itemHoverStyle: {  
                color: '#fff'  
            },  
            itemHiddenStyle: {  
                color: '#fff'  
            }  
        },  
        labels: {  
            style: {  
                color: '#fff'  
            }  
        },  
  
        navigation: {  
            buttonOptions: {  
                theme: {  
                    stroke: '#fff'  
                }  
            }  
        }  
    };  
// Apply the theme  
Highcharts.setOptions(Highcharts.theme);  

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


const changeSelect = (id)=>{
	console.log(id)
}
export class Info extends Component {
	constructor(props){
		super(props)
		this.state={
			dragen:{},
			medicines:[],
			freeze:{},
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50,//总共多少页
	    	options : {
			    chart: {
			        type: 'area',
			        spacingBottom: 30
			    },
			    title: {
			        text: ''
			    },
			    subtitle: {
			        text: '',
			        floating: true,
			        align: 'right',
			        verticalAlign: 'bottom',
			        y: 15
			    },
			    legend: {
			        layout: 'vertical',
			        align: 'left',
			        verticalAlign: 'top',
			        x: 150,
			        y: 100,
			        floating: true,
			        borderWidth: 1,
			        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
			    },
			    xAxis: {
			        categories: []
			    },
			    yAxis: {
			        title: {
			            text: 'VP'
			        },
			        labels: {
			            formatter: function () {
			                return this.value;
			            }
			        }
			    },
			    tooltip: {
			        formatter: function () {
			            return '<b>' + this.series.name + '</b><br/>' +
			                this.x + ': ' + this.y;
			        }
			    },
			    plotOptions: {
			        area: {
			            fillOpacity: 0.5
			        }
			    },
			    credits: {
			        enabled: false
			    },
			    series: [{
			        name: 'VP',
			        data: []//
			    }]
			}
		}
	}
	componentDidMount() {
		console.log(this.props.match)
		getMyDragens((dragens)=>{
			this.setState({
				dragens
			})
		})
		let medicines = [
						{
							name:'Big Power Booster',
							time:'21:20',
							id:'0'
						},
						{
							name:'Big Agility Booster',
							time:'21:20',
							id:'1'
						}
					]

		

		let that = this;
		let id = getQueryString(this.props.location.search,'id')
	
		callArgs[0] = id
		call(contractAddress, 0, 'getMBI',callArgs, (resp) =>{
			console.log(JSON.parse(resp.result).m)
			let dragen = JSON.parse(resp.result).m
			console.log(processDragen(dragen,id,'info'))
			that.setState({
				dragen:processDragen(dragen,id,'info'),
				medicines
			})

			callArgs = new Array()
			callArgs[0] = id
			console.log(callArgs)
			this.chart = new Highcharts['Chart'](this.refs.chart,this.state.options)
			call(contractAddress, 0, 'getMonsterFightLog',callArgs, (resp) =>{
				let result = JSON.parse(resp.result)
				if(result.length == 0){
					return
				}
				console.log(result)
				if(result instanceof Object){
					let allLogs = result.msg

					var weghtArray = []
					var x_array = []
					var index = 0

					for(let key in allLogs){
						index ++ 
						var logArr = allLogs[key].split('|') 
						if(key == logArr[0]){
							if( logArr[15] === 'a' ){
								weghtArray.push(parseFloat(( parseFloat(logArr[5]) + parseFloat(logArr[16]) ).toFixed(2)))
							}else{
								weghtArray.push(parseFloat(( parseFloat(logArr[5]) + parseFloat(logArr[16]) ).toFixed(2)))
							}
						}else{
							if( logArr[15] === 'a' ){
								weghtArray.push(parseFloat((   parseFloat(logArr[5]) + parseFloat(logArr[16])   ).toFixed(2)))
							}else{
								weghtArray.push(parseFloat((   parseFloat(logArr[5]) - parseFloat(logArr[16])   ).toFixed(2)))
							}
						}
						
						x_array.push(index)
					}
					
					
					console.log(weghtArray)
					
				
					let options = this.state.options
					options.series[0].data = weghtArray
					options.xAxis.categories = x_array

					this.setState({
						options:options
					})
					setTimeout(() =>{
						that.chart = new Highcharts['Chart'](that.refs.chart,this.state.options)
					},2000)
				}
			})
			
			
			// console.log(processDragen(dragen,id,'hatched'))
		})



	

	
		
	}
	render() {
		let state = this.state
		let dragen = state.dragen;

		console.log(dragen)

		if(!dragen.id){
			return(
				<div id="info"></div>
			)
		}


		return (
			<div id="info">
				<div className="content">
					<div className="container_960px">
						<div className="session_01">
							<Layout.Row type="flex" className="info-1-top" justify="space-between">
								<Layout.Col span="10">
									<div className="name">{dragen.name}</div>
									<div className="tag" style={{background:`url(${dragenTag[dragen.type]}) center/100% 100% no-repeat`}}>{dragen.type}</div>
								</Layout.Col>
								<Layout.Col  className="token" span="10">CRYPTO MONSTER  # {dragen.id}</Layout.Col>
							</Layout.Row>
							<Layout.Row type="flex" className="info-1-mid" justify="space-between">
								<img alt={dragen.dragenImg} style={{width:'300px',top:'-60px'}} className="dragen x-mid" src={dragen.dragenImg}/>
								<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield')?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
							</Layout.Row>
							<Layout.Row type="flex" className="info-1-bottom" justify="space-between">
								<Layout.Col className="vp" span="8">
									<div className="label">VITALITY POINT:</div>
									<div className="num" >{dragen.VG} VP</div>
								</Layout.Col>
								<Layout.Col className="status" span="8">
									<Layout.Row type="flex"  justify="space-between">
										{
											dragen.status.map((v,i) =>
												<Layout.Col key={i} className="state"  >
													<img alt="shield" style={v.name === 'shield'? {width:'24px'}:{}} src={buffImgs[v.name]}/>
													<span style={{color:`${buffcolor[v.name]}`}}>{v.time}</span>
												</Layout.Col>
											)
										}
									</Layout.Row>
								</Layout.Col>
								<Layout.Col className="owner" span="8">
									<div className="name">owner:</div>
									<div className="address ellipsis">{dragen.owner}</div>
								</Layout.Col>
							</Layout.Row>
						</div>
					</div>
					<div className="session_02">
						<div className="container_960px">
							<div className="attack">
								<div className="btn" onClick={e =>{alertMyDragens(dragen.id,state.dragens)}}><img alt="attack" src={require('../assets/images/attack.png')}/>ATTACK</div>
								<div className="tip">Use your crypto monster to fight with this monster.</div>
							</div>
							<div className="buy"  >
								<div className="tip" style={dragen.onsale === 0?{"display":'none'}:{}}>on sale for {dragen.price} NAS</div>
								<div className={dragen.onsale === 0?"btn disable":'btn'} onClick={e =>{buyDragen(dragen.id,dragen.price)}}>BUY</div>
							</div>
							<div className="text">
								
							</div>
						</div>
					</div>
					<div className="container_960px">
						<div className="session_03">
							<div className="left">
								<div className="feature">
									<div className="tit">CHARACTERISTICS</div>
									<ul className="ul">
										<li>
											<span>lucky:</span>
											<span>{dragen.property.lucky}</span>
										</li>
										<li>
											<span>power:</span>
											<span>{dragen.property.power}</span>
										</li>
										<li>
											<span>agility:</span>
											<span>{dragen.property.agility}</span>
										</li>
										<li>
											<span>speed:</span>
											<span>{dragen.property.speed}</span>
										</li>
									</ul>
									<div className="born">Birthdate — {getBirthDay(dragen.born)}</div>
								</div>

								



								<div className="freeze" style={{display:'none'}}>
									<div className="tit">
										<div>
											<img alt="freeze" src={require('../assets/images/status/freeze.png')}/>
										</div>
										<div>
											<div>COOLDOWN</div>
										</div>
									</div>
									<ul className="ul">
										<li>
											<span>COOLDOWN TIME:</span>
											<span>{dragen.freeze.time}</span>
										</li>
										<li>
											<span>CAN ATTACK:</span>
											<span>READY</span>
										</li>
										<li>
											<span>CAN BE ATTACKED:</span>
											<span style={{color:'#289a48'}}> PROTECTION</span>
										</li>
									</ul>
									<div className="tips">
										Monster can not be attacked under protection
									</div>
								</div>
							</div>
							<div className="right">
								<div className="chart">
									<div className="title">
										VP HISTORY
									</div>
									<div className="chart-container" ref='chart'>
										
									</div>
								</div>

								
								
							</div>
						</div>
					</div>















					<div className="info-bg">
					</div>
				</div>
			</div>
		);
	}
}

// <div className="fight">
// 	<div className="title">
// 		<span style={{verticalAlign:'top'}}>HISTORY</span>
// 		<Myselect select={select} onSelect={changeSelect}></Myselect>
// 	</div>

// 	<div className="pages">
// 		<div className="label">PAGES</div>
// 		<Pagination  currentPage={state.currentPage} onCurrentChange={this.pageChange} pageSize={state.pageSize} layout="prev, pager, next" total={state.total}/>
// 	</div>
// </div>
// 
// 
// 
// 
// <div className="medicine">
// 	<div className="tit">
// 		<div>
// 			<img alt="power" src={require('../assets/images/status/strong.png')}/>
// 		</div>
// 		<div>
// 			<div>ITEM</div>
// 			<div>Active boosters</div>
// 		</div>
// 	</div>
// 	<ul  className="ul">
// 		{
// 			state.medicines.map((v,i)=>
// 				<li key={i}>
// 					<div>
// 						<img alt="medicine" src={medicinesObj[v.id].img}/>
// 					</div>
// 					<div>
// 						<div>
// 							<div className="tit">{v.name}</div>
// 							<div className="content">{medicinesObj[v.id].effect}</div>
// 						</div>
// 						<div>
// 							<div className="tit">Booster till:</div>
// 							<div className="content">{v.time}</div>
// 						</div>
// 					</div>
// 				</li>
// 			)

// 		}
// 	</ul>
// 	<div className="to-item">Go to MY ITEM</div>
// </div>