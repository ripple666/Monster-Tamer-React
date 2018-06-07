import React, { Component } from 'react';


let stone = {
	'common' : require('../assets/images/common.png'),
	'elite' : require('../assets/images/elite.png'),
	'epic' : require('../assets/images/epic.png'),
	'rare' : require('../assets/images/rare.png'),
	'legendary' : require('../assets/images/tegendary.png'),
}

let buffImgs = {
	'shield' : require('../assets/images/status/shield.png'),
	'strong' : require('../assets/images/status/strong.png'),
	// 'freeze' : require('../assets/images/status/freeze.png')
}

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
								ATTACK
							</ul>
				break;
			default: 
				carButton=  <div>
				</div>
				break;
		}
		
		return (
			<div className={`card-Dragen ${cardDragenType}`}>
				<div className="session_1">
					{dragen.buffs.map((buff,i) =>
						<img key={i} className="buff" src={buffImgs[buff]} alt={buffImgs[buff]}/>
					)}
					<span className="name" style={{marginRight:(dragen.buffs.length*14+7)+'px'}}>{dragen.name}</span>
				</div>
				<div className="session_2">
					<img alt="stone" className="stone x-mid" src={stone[dragen.type]}/>
					<img alt={dragen.dragenImg}  className="dragen x-mid" src={dragen.dragenImg}/>
					<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield')?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
					<span className="vg x-mid">VP: {dragen.VG}</span>
				</div>
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
				<div className="session_4">
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
					<ul >
						<li className="price">{medicine.price} NAS</li>
						<li className="buy">BUY</li>
					</ul>
				</div>
			</div>
		);
	}
}

