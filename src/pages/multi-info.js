import React, { Component } from 'react';
import { Layout } from 'element-react'
import {buffImgs,dragenTag,buffcolor,medicinesObj} from '../assets/data/data.js'
import {Myselect} from '../components/pics/select.js'

import { Pagination } from 'element-react'

import Highcharts from 'highcharts';
import HighchartMore from 'highcharts/highcharts-more';
import HighchartsData from 'highcharts/modules/data'
// 添加data.js
HighchartsData(Highcharts);
// 添加highcharts-more
HighchartMore(Highcharts);

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

const options =  {
    chart: {
        type: 'area',
        spacingBottom: 30
    },
    title: {
        text: '小张和小潘家水果的消费情况 *'
    },
    subtitle: {
        text: '* 小潘家的香蕉消费未知',
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
        categories: ['苹果', '梨', '橘子', '香蕉', '葡萄', '李子', '草莓', '树莓']
    },
    yAxis: {
        title: {
            text: 'Y-Axis'
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
        name: '小张',
        data: [0, 1, 4, 4, 5, 2, 3, 7]
    }, {
        name: '小潘',
        data: [1, 0, 3, null, 3, 1, 2, 1]
    }]
}

const changeSelect = (id)=>{
	console.log(id)
}
export class MultiInfo extends Component {
	constructor(props){
		super(props)
		this.state={
			dragen:{},
			medicines:[],
			freeze:{},
	    	currentPage:1,
	    	pageSize:12,//每页显示的数量
	    	total:50//总共多少页
		}
	}
	componentWillMount() {
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

		let freeze = {
			time:'21:03'
		}

		let dragen =
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
			}
	
		this.setState({
			dragen:dragen,
			medicines,
			freeze
		})
	}
	componentDidMount() {
		console.log('info')
		 this.chart=new Highcharts['Chart'](this.refs.chart,options)
	}
	render() {
		let state = this.state
		let dragen= state.dragen;
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
								<Layout.Col  className="token" span="10">CRYPTO FISH TOKEN # {dragen.id}</Layout.Col>
							</Layout.Row>
							<Layout.Row type="flex" className="info-1-mid" justify="space-between">
								<img alt={dragen.dragenImg}  className="dragen x-mid" src={dragen.dragenImg}/>
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
								<div className="btn"><img alt="attack" src={require('../assets/images/attack.png')}/>ATTACK</div>
								<div className="tip">use your crypto fish token to fight with this fish.</div>
							</div>
							<div className="buy">
								<div className="tip">on sale for 50.02 NAS</div>
								<div className="btn">BUY</div>
							</div>
							<div className="text">
								<div>use your crypto fish token to fight with this fish.</div>
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
											<span>LUYCK:</span>
											<span>{dragen.property.luyck}</span>
										</li>
										<li>
											<span>POWER:</span>
											<span>{dragen.property.power}</span>
										</li>
										<li>
											<span>agility</span>
											<span>{dragen.property.agility}</span>
										</li>
										<li>
											<span>speed</span>
											<span>{dragen.property.speed}</span>
										</li>
									</ul>
									<div className="born">Birthdate — Mar 18, 2018</div>
								</div>

								<div className="medicine">
									<div className="tit">
										<div>
											<img alt="power" src={require('../assets/images/status/strong.png')}/>
										</div>
										<div>
											<div>ITEM</div>
											<div>Active boosters</div>
										</div>
									</div>
									<ul  className="ul">
										{
											state.medicines.map((v,i)=>
												<li key={i}>
													<div>
														<img alt="medicine" src={medicinesObj[v.id].img}/>
													</div>
													<div>
														<div>
															<div className="tit">{v.name}</div>
															<div className="content">{medicinesObj[v.id].effect}</div>
														</div>
														<div>
															<div className="tit">Booster till:</div>
															<div className="content">{v.time}</div>
														</div>
													</div>
												</li>
											)

										}
									</ul>
									<div className="to-item">Go to MY ITEM</div>
								</div>
								<div className="freeze">
									<div className="tit">
										<div>
											<img alt="freeze" src={require('../assets/images/status/freeze.png')}/>
										</div>
										<div>
											<div>COOLDDOWN</div>
										</div>
									</div>
									<ul className="ul">
										<li>
											<span>COOLDDOWN TIME:</span>
											<span>{state.freeze.time}</span>
										</li>
										<li>
											<span>CAN ATTACK:</span>
											<span>READY</span>
										</li>
										<li>
											<span>CAN BR ATTACKED</span>
											<span style={{color:'#289a48'}}> PROTECTION</span>
										</li>
									</ul>
									<div className="tips">
										Moster can not be attacked more than one time per CD TIME
									</div>
								</div>
							</div>
							<div className="right">
								<div className="chart">
									<div className="title">
										WEIGHT HISTORY
									</div>
									<div className="chart-container" ref='chart'>
										
									</div>
								</div>

								<div className="fight">
									<div className="title">
										<span style={{verticalAlign:'top'}}>HISTORY</span>
										<Myselect select={select} onSelect={changeSelect}></Myselect>
									</div>

									<div className="pages">
										<div className="label">PAGES</div>
										<Pagination  currentPage={state.currentPage} onCurrentChange={this.pageChange} pageSize={state.pageSize} layout="prev, pager, next" total={state.total}/>
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
