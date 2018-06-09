import React, { Component } from 'react';
import {stone,buffImgs,dragenTag} from '../assets/data/data.js'


export class CardDragen extends Component {
	/**
	 * /
	 * @param  {[dragen]} props [per dragen property]
	 * @param {[type]} [varname] [description]
	 */
	constructor(props) {
	    super(props);
	    this.state={
	    }
	}

	render() {
		let carButton;
		let props = this.props
		let dragen = props.dragen
		let property = dragen.property
		let cardDragenType = dragen.from
		
		let dragenState  = 	<div className="session_1">
								{dragen.buffs.map((buff,i) =>
									<img key={i} className="buff" src={buffImgs[buff]} alt={buffImgs[buff]}/>
								)}
								<span className="name" style={{marginRight:(dragen.buffs.length*14+7)+'px'}}>{dragen.name}</span>
							</div>
		let dragenImg = <div className="session_2">
							<img alt="stone" className="stone x-mid" src={stone[dragen.type]}/>
							<img alt={dragen.dragenImg}  className="dragen x-mid" src={dragen.dragenImg}/>
							<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield')?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
							<span className="vg x-mid">VP: {dragen.VG}</span>
						</div>
		switch(cardDragenType){
			case 'market':
				carButton = <ul>
								<li className="price">{dragen.price} NAS</li>
								<li className="buy">BUY</li>
							</ul>
				break;
			case 'assets':
					if(props.isFusion){
						carButton = <ul className="assets_btn" style={dragen.onsale?{border:'1px solid rgba(255,255,255,0.4)',background:'transparent',color:'rgba(255,255,255,0.4)'}:{background:'#159dba'}}>
								FUSION
							</ul>
					}else{
						carButton = <ul className="assets_btn" style={dragen.onsale?{border:'1px solid rgba(255,255,255,0.4)',background:'transparent',color:'rgba(255,255,255,0.4)'}:{}}>
								SELL
							</ul>
					}
				break;
			case 'attack':
				carButton = <ul className="attack_btn">
								<img alt="attack" src={require('../assets/images/attack.png')}/>ATTACK
							</ul>
				break;
			case 'attacking':
				dragenState  =  <div></div>

				dragenImg = <div className="session_2">
								<img alt={dragen.dragenImg}  className="dragen x-mid" src={dragen.dragenImg}/>
								<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield') && dragen.from !== 'attacking'?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
								<span className="vg x-mid">
									<span>{dragen.name}</span><br/>
									<span className="tag" style={{background:`url(${dragenTag[dragen.type]}) center/100% 100% no-repeat`}}>{dragen.type}</span><br/>
									<span>VP: {dragen.VG}</span>
								</span>
							</div>

				carButton = <div>
								<span style={{color:'#b08d65',fontSize:'14px',marginRight:'5px'}}>owner:</span>{dragen.owner}
							</div>
				break;
			case 'attacked':
				dragenState  =  <div className="result" style={dragen.result_2v2.name==='lost'?{color:'#ff7272'}:{}}>
									<p className="add">{dragen.result_2v2.add}</p>
									<p className="name">{dragen.result_2v2.name}</p>
								</div>

				dragenImg = <div className="session_2">
								<img alt={dragen.dragenImg}  className="dragen x-mid" src={dragen.dragenImg}/>
								<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield') && dragen.from !== 'attacking' && dragen.from !== 'attacked'?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
								<span className="vg x-mid">
									<span>{dragen.name}</span><br/>
									<span className="tag" style={{background:`url(${dragenTag[dragen.type]}) center/100% 100% no-repeat`}}>{dragen.type}</span><br/>
									<span>VP: {dragen.VG}</span>
								</span>
							</div>

				carButton = <div>
								<span style={{color:'#b08d65',fontSize:'14px',marginRight:'5px'}}>owner:</span>{dragen.owner}
							</div>
				break;
			default: 
				carButton=  <div>
				</div>
				break;
		}
		
		return (
			<div className={`card-Dragen ${cardDragenType}`}>
				{dragenState}
				{dragenImg}
				<div className="session_3">
					<ul className="properties x-mid" >
						<li>
							<span>
								<span className="key">LUYCK: </span>
								<span className="value">{property.luyck}</span>
							</span>
							<span>
								<span className="key">SPEED: </span>
								<span className="value">{property.speed}</span>
							</span>
						</li>
						<li>
							<span>
								<span className="key">POWER: </span>
								<span className="value">{property.power}</span>
							</span>
							<span>
								<span className="key">AGILITY: </span>
								<span className="value">{property.agility}</span>
							</span>
						</li>
					</ul>
				</div>
				<div className="status">
						{dragen.status.map((statu) =>
							<span key={statu.name}>
								<img  className="buff" src={buffImgs[statu.name]} alt={buffImgs[statu.name]}/>
								<span>{statu.time}</span>
							</span>
						)}
				</div>
				<div className="session_4" onClick={(e) =>props.dragenCardBtnClick(dragen.id)}>
					{carButton}
				</div>
			</div>
		);
	}
}

export class CardMedicine extends Component {
	constructor(props) {
	    super(props);
	    this.state={
	    }
	}
	render() {
		let props = this.props
		let medicine = props.medicine
		return (
			<div className="card-Mdicine">
				<img alt="medicine" src={medicine.img} />
				<div className="name">
					{medicine.name}
				</div>
				<div className="session_3">
					<ul className="properties x-mid" >
						<li>
							<span>
								<span className="key">POWER: </span>
								<span className="value">{medicine.power}</span>
							</span>
							<span>
								<span className="key">TIME: </span>
								<span className="value">{medicine.time}</span>
							</span>
						</li>
						<li>
							<span>
								<span className="key">EFFECT:  </span>
								<span className="value">{medicine.effect}</span>
							</span>
						</li>
					</ul>
				</div>
				<div className="session_4">
					<ul onClick={(e) =>props.medicineCardBtnClick(medicine.id)}>
						<li className="price">{medicine.price} NAS</li>
						<li className="buy">BUY</li>
					</ul>
				</div>
			</div>
		);
	}
}



export class CardEgg extends Component {
	constructor(props) {
	    super(props);
	    this.state={
	    }
	}

	render() {
		let props = this.props;
		let egg = props.egg;
		let eggStyle;
		let eggInfo;
		switch (egg.type){
			case 'nas'://按蛋分类
				eggStyle = {background:`url(${require('../assets/images/egg-bg-01.jpg')}) center/cover no-repeat`}
				eggInfo = 	<div className="egg-info" >
					 		<div  style={{margin:'8px 0'}}>GET PRICE </div>
					 		<div>
					 			<span className="btn">
						 			<span>0.01</span>
						 			<span>nas</span>
						 		</span>
					 		</div>
					 		<div>
					 			<span className="btn">x10</span>
					 		</div>
					 		<div>
					 			<span>
					 				<span  style={{color:'#fff'}}>for</span>
					 				<span  style={{margin:'0 4px'}}>0.1 </span>
					 				<span  style={{color:'#fff'}}>nas</span>
					 			</span>
					 		</div>
						</div>
				
				
				break;
			case 'integral':
				eggStyle = {background:`url(${require('../assets/images/egg-bg-02.jpg')}) center/cover no-repeat`}
				eggInfo = 	<div className="egg-info">
								<div style={{margin:'16px 0'}}>my integration: 400 <img alt="integral" src={require('../assets/images/integral-tag.png')}/></div>
						 		<div>
						 			<span className="btn">
							 			<img alt="integral" src={require('../assets/images/integral-tag.png')}/>
							 			<span>300</span>
							 		</span>
						 		</div>
						 		<div style={{color:'#fff',marginBottom:'20px',fontSize:'18px'}}>*Integration Only</div>
						 		<div>Integral eggs can only be obtained through team battles</div>
							</div>
				break;
			case 'free':
				eggStyle = {background:`url(${require('../assets/images/egg-bg-03.jpg')}) center/cover no-repeat`}
				eggInfo = 	<div className="egg-info">
						 		<div>
						 			<span className="btn" style={{marginTop:'34px'}}>free</span>
						 		</div>
						 		<div>* Only one for each account</div>
							</div>
				break;
			default:

				eggInfo = 	<div className="egg-info">
									<span></span>
							</div>
				break;
		}
		return (
			<div className="card-egg">
				<div className="egg-pic" style={eggStyle}>
				 	<img alt="egg" src={egg.img}/>
				</div>
				{eggInfo}
			</div>
		);
	}
}


