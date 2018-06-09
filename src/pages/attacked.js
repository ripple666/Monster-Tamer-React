import React, { Component } from 'react';

import {setCurNavStyle} from '../utils/api.js'
import {CardDragen} from '../components/card'


export class Attacked extends Component {
	constructor(props) {
		super(props)
		this.state={
			dragens:[]
		}
	}
	componentWillMount(nextProps) {
		this.getDragens()
	}
	componentDidMount() {
		setCurNavStyle('attack')
	}
	getDragens(){
		let dragens = [
			{

				from:'attacked',
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
				result_2v2:{
					name:'winner',
					add:'+56kg'
				},
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
			},
			{
				from:'attacked',
				name:'triceratops',
				type:'legendary',
				buffs:['strong'], //龙的buff
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
				result_2v2:{
					name:'lost',
					add:'-56kg'
				},
				onsale:true,
				VG:'2023.02',
				dragenImg:require('../assets/images/dragen_demo.png'),
				property:{
					luyck:52,
					speed:18,
					power:1,
					agility:18
				},
				owner:'suerjoieawuguhagwiuej2qeqwe2foiew',
				price:'1.20',
				id:1
			}
		]
		this.setState({
			dragens:dragens
		})
		console.log(this.state.dragens)
	}
	render() {
		let state = this.state
		
		let dragens = state.dragens
		console.log(dragens)
		return (
			<div id="attacked">
				<div className="container_960px">
					<div className="title">
						<p>DUEL INITIATED</p>
						<p>Receive random crypto fish token to play the game. Every time you catch</p>
						<p> you will get at least one Common or better.</p>
					</div>
					<div className="content clearfloat">
						<div className="session_01">
							<CardDragen  key={dragens[0].id} dragen={dragens[0]}  />
						</div>
						<div className="session_02">
							<img className="x-mid vs-icon" alt="vs " src={require('../assets/images/VS.png')}/>
						</div>
						<div className="session_03">
							<CardDragen  key={dragens[1].id} dragen={dragens[1]} />
						</div>
					</div>
					<div className="pics">
						<p>t's like fishing in real life — you will never know what you will get. Chance to get Rare is 1:5,</p>
						<p> Epic 1:50, Legendary 1:5000, Top Legendary (Whale) is 1:1000000.</p>
					</div>
				</div>
			</div>
		);
	}
}
