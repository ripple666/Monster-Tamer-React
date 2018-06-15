import React, { Component } from 'react';
import {stone,buffImgs,dragenTag,tagColor} from '../assets/data/data.js'
import { Link } from 'react-router-dom';

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
		let dragenFrom = dragen.from
		
		let dragenState  = 	<div className="session_1">
								{dragen.buffs.map((buff,i) =>
									<img key={i} className="buff" src={buffImgs[buff]} alt={buffImgs[buff]}/>
								)}
								<span className="name" style={{marginRight:(dragen.buffs.length*14+7)+'px'}}>{dragen.name}</span>
							</div>
		let dragenImg = <div className="session_2">
							<img alt="stone" className="stone x-mid" src={stone[dragen.type]}/>
							<Link to={{pathname:`/info`,search:`?id=${dragen.id}`,}}>
								<img className="dragen x-mid" src={dragen.dragenImg}/>
							</Link>
							<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield')?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
							<span className="vg x-mid">VP: {dragen.VG}</span>
						</div>
		switch(dragenFrom){
			case 'market':
				carButton = <ul onClick={(e) =>props.dragenCardBtnClick(dragen.id,dragen.price)}  style={{lineHeight:'60px',fontSize:'25px'}}>
							{dragen.price} NAS
							</ul>
				break;
			case 'assets':
					
				carButton = <div>
								<ul onClick={(e) =>props.dragenCardBtnClick(dragen.id,dragen.onsale)} className={dragen.onsale?'disable assets_btn' : 'assets_btn'} style={dragen.onsale?{border:'1px solid rgba(255,255,255,0.4)',background:'transparent',color:'rgba(255,255,255,0.4)',pointerEvents:'auto',display:'inline-block',textAlign:'center'}:{display:'inline-block','marginLeft':'53px','textAlign':'center'}}>
									sell
								</ul>
								<ul className="assets_btn" onClick={(e) =>props.dragenCardBtnClick(dragen.id,dragen.onsale,'fusion')} style={{cursor:'pointer'}}>
									fuse
								</ul>
							</div>
					
				break;
			case 'attack':
				carButton = <ul className="attack_btn" onClick={(e) =>props.dragenCardBtnClick(dragen.id)}>
								<img alt="attack" src={require('../assets/images/attack.png')}/>ATTACK
							</ul>
				break;
			case 'attacking':
				dragenState  =  <div></div>

				dragenImg = <div className="session_2">
								<Link to={{pathname:`/info`,search:`?id=${dragen.id}`,}}><img alt={dragen.dragenImg}  className="dragen x-mid" src={dragen.dragenImg}/></Link>
								<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield') && dragen.from !== 'attacking'?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
								<span className="vg x-mid">
									<span>{dragen.name}</span><br/>
									<span className="tag" style={{background:`url(${dragenTag[dragen.type]}) center/100% 100% no-repeat`}}>{dragen.type}</span><br/>
									<span>VP: {dragen.VG}</span>
								</span>
							</div>

				carButton = <div onClick={(e) =>props.dragenCardBtnClick(dragen.id)}>
								<span style={{color:'#b08d65',fontSize:'14px',marginRight:'5px'}}>owner:</span>{dragen.owner}
							</div>
				break;
			case 'attacked':
				dragenState  =  <div className="result" style={props.result_2v2.name.toLowerCase()==='lost'?{color:'#ff7272'}:{}}>
									<p className="add">{props.result_2v2.add}</p>
									<p className="name">{props.result_2v2.name}</p>
								</div>

				dragenImg = <div className="session_2">
								<Link to={{pathname:`/info`,search:`?id=${dragen.id}`,}}><img onClick={e =>{}}  className="dragen x-mid" src={dragen.dragenImg}/></Link>
								<img alt="shield" className="shield x-mid" style={dragen.buffs.includes('shield') && dragen.from !== 'attacking' && dragen.from !== 'attacked'?{display:'block'}:{display:'none'}} src={require('../assets/images/shield-light.png')}/>
								<span className="vg x-mid">
									<span>{dragen.name}</span><br/>
									<span className="tag" style={{background:`url(${dragenTag[dragen.type]}) center/100% 100% no-repeat`}}>{dragen.type}</span><br/>
									<span>VP: {dragen.VG}</span>
								</span>
							</div>

				carButton = <div onClick={(e) =>props.dragenCardBtnClick(dragen.id)}>
								<span style={{color:'#b08d65',fontSize:'14px',marginRight:'5px'}}>owner:</span>{dragen.owner}
							</div>
				break;
			case 'hatched':
				dragenState = <div className="session_1">
								<span className="name" >{dragen.name}</span>
							</div>
				break;
			case 'top':
				dragenState  = 	<div className="session_1">
									<span className="name" style={{marginRight:(7)+'px'}}>{dragen.name}</span>
									{dragen.buffs.map((buff,i) =>
										<img key={i} className="buff" src={buffImgs[buff]} alt={buffImgs[buff]}/>
									)}
								</div>
				dragenImg = <div className="session_2">
								<span className="vg x-mid">
									<span className="tag" style={{background:`url(${dragenTag[dragen.type]}) center/100% 100% no-repeat`}}>{dragen.type}</span><br/>
									<span> {dragen.VG} VP</span>
								</span>
							</div>
				carButton = <span onClick={(e) =>props.dragenCardBtnClick(dragen.id)}>
								owner：{dragen.owner}
							</span>
				break;
			case 'fused':
				carButton =  <Link to={{
									  pathname: '/my-assets',
									}}>
									back to fusion
							</Link>
				break;
			default: 
				carButton=  <div onClick={(e) =>props.dragenCardBtnClick(dragen.id)}>
							</div>
				break;
		}
		
		return (
			<div className={`card-Dragen ${dragenFrom}`}>
				{dragenState}
				{dragenImg}
				<div className="session_3">
					<ul className="properties x-mid" >
						<li>
							<span>
								<span className="key">lucky: </span>
								<span className="value">{property.lucky}</span>
							</span>
							<span>
								<span className="key">speed: </span>
								<span className="value">{property.speed}</span>
							</span>
						</li>
						<li>
							<span>
								<span className="key">power: </span>
								<span className="value">{property.power}</span>
							</span>
							<span>
								<span className="key">agility: </span>
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
				<div className="session_4" >
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
		let button ;
		switch(medicine.from){
			case 'assets':
					button = <ul onClick={(e) =>props.medicineCardBtnClick(medicine.id)} style={{lineHeight:'60px'}}>
									boost
							</ul>
				break;
			default:
				button = <ul onClick={(e) =>props.medicineCardBtnClick(medicine.id)} style={{lineHeight:'60px',fontSize:'25px'}}>
							{medicine.price} NAS
						</ul>
				break;
		}
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
								<span className="key">{(medicine.name.split(' ')[1]).toLowerCase()}: </span>
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
					{button}
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
					 			<span className="btn" onClick={(e) =>{props.getOneEgg()}}>
						 			<span>0.01</span>
						 			<span>nas</span>
						 		</span>
					 		</div>
					 		<div>
					 			<span className="btn" style={{backgroundColor:"rgb(170,132,55)"}} onClick={(e) =>{props.getTenEgg()}}>x10</span>
					 		</div>
					 		<div>
					 			<span >
					 				<span  style={{color:'#fff'}}>for</span>
					 				<span  style={{margin:'0 4px',color:"#f5ca65",fontSize:'16px'}}>0.1 </span>
					 				<span  style={{color:'#fff'}}>nas</span>
					 			</span>
					 		</div>
						</div>
				
				
				break;
			case 'integral':
				eggStyle = {background:`url(${require('../assets/images/egg-bg-02.jpg')}) center/cover no-repeat`}
				eggInfo = 	<div className="egg-info">
								<div style={{margin:'16px 0'}}>score:  {window.interal} <img alt="integral" src={require('../assets/images/integral-tag.png')}/></div>
						 		<div>
						 			<span className="btn" onClick={(e) =>{props.getIntegralEgg()}} >
							 			<img alt="integral" src={require('../assets/images/integral-tag.png')}/>
							 			<span>1000</span>
							 		</span>
						 		</div>
						 		<div>*Score egg only can be obtained by join team battles</div>
							</div>
				break;
			case 'free':
				eggStyle = {background:`url(${require('../assets/images/egg-bg-03.jpg')}) center/cover no-repeat`}
				eggInfo = 	<div className="egg-info">
						 		<div>
						 			<span  id="hach-free-egg" onClick={(e) =>{props.getFreeEgg()}}  className={props.btnDisable ? 'disable btn' : "btn"} style={{marginTop:'34px'}}>free</span>
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



export class CardMultiDragen extends Component {
	constructor(props) {

	    super(props);
	    this.jionTeam = this.jionTeam.bind(this)
	    this.state={
	    }
	}
	jionTeam(id){
		this.props.jionTeam(id)
	}
	render() {
		let multiDragen = this.props.multiDragen
		console.log(multiDragen)
		let lastPosition  =[];
		if(multiDragen.dragens.length === 1){
			lastPosition = [1,2]
		}else if(multiDragen.dragens.length === 2){
			lastPosition = [1]
		}else if(multiDragen.dragens.length === 3){
			lastPosition = []
		}
		return (
			<div className="Card-multi-dragen">
				<div className="left">
					<div>
					   <img src={require('../assets/images/mutil-power.png')} />
					   <div>
					   		<div>{multiDragen.power}</div>
					   		<div>team power</div>
					   </div>
					</div>
					<div>
					   <img src={require('../assets/images/prestig.png')}/>
					   <div>
					   		<div>{multiDragen.prestige}</div>
					   		<div>prestige</div>
					   </div>
					</div>
					<div>
					   <img src={require('../assets/images/warn.png')}/>
					   <div>
					   		<div>limitation</div>
					   		<div>common</div>
					   </div>
					</div>
					<div style={multiDragen.from==='me'?{display:'none'}:{}}>
					  	<ul onClick={e=>{this.props.multiAttack(multiDragen.id)}} className={multiDragen.fight == 0 ? "attack_btn disable" : "attack_btn"} style={{backgroundColor:'#9e2121',width:'180px',lineHeight:'50px',fontSize:'24px',textAlign:'center',cursor:'pointer'}}>
							<img style={{width:'30px',height:'27px',margin:'0px  6px 0 0'}} alt="attack" src={require('../assets/images/attack.png')}/>ATTACK
						</ul>
					</div>
				</div>
				<div className="mid">
					{
						multiDragen.dragens.map((dragen,i) =>
							<div key={dragen.id} style={{marginRight:'10px',backgroundColor:'rgba(0,0,0,0.1)',padding:'10px 10px 0 10px ',width:'220px',height:'212px',textAlign:'center',cursor:'pointer'}}>
								<Link to={{pathname:`/info`,search:`?id=${dragen.id}`,}}><img className="pic" style={{width:'180px'}} src={dragen.dragenImg}/></Link>
								<div style={{background:`url(${require('../assets/images/type-multi.png')}) center/cover no-repeat`,color:`${tagColor[dragen.type]}`,textAlign:'center',fontSize:'16px',lineHeight:'24px'}}>{dragen.type}</div>
							</div>
						)
					}
					{
						lastPosition.map((v,i) =>
							<div key={i} onClick={e=>{this.jionTeam(multiDragen.id)}} style={{marginRight:'10px',backgroundColor:'rgba(0,0,0,0.1)',padding:'10px 10px 0 10px ',width:'220px',height:'212px',textAlign:'center',cursor:'pointer'}}>
								<img className="pic" style={{width:'110px',height:'72px',marginTop:'80px'}} src={require('../assets/images/multi-empty.png')}/>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}
