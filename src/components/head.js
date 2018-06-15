import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {addLoading,rmLoading} from '../utils/api.js'
import logo from '../assets/images/logo.png';


import setIcon from '../assets/images/icon_setting.png'




export class head extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 

	    };
	}

	componentDidMount(){
		// const path = props.match.params.number
		
		
		
	}

	render() {
		return (
			<div id="head">
				<div className="logo-cnt main">
					<div className="account clearfloat">
						<span className="">
							<span id="nick-name">nickName</span>
						</span>
						<span className="">
							
							<img alt='set' src={require('../assets/images/integral-tag.png')}/>
							<span id="head-integral">0</span>
						</span>
					</div>
					<img alt="logo"  className={logo} src={logo} />
				</div>
				<div className="navs">
					<div className="nav-container clearfloat ">
						{this.props.navs.map((nav) =>
							<li onClick={(e) =>{ rmLoading() }}  key={nav.path.split('/')[1] ? nav.path.split('/')[1] : 'market'} id={'nav-'+nav.name}  className="nav" >
							  <Link to={`${nav.path}`}>
							  	<i alt={nav.name} >{nav.icon}</i>
							  </Link>
							  <img alt="fire" className="x-mid" src={require('../assets/images/fire.png')} />
							</li>
						)}
						
					</div>
				</div>
			</div>
		);
	}
}

// <li id="nav-warn"   className="nav" style={{float:'right',width:'60px'}}>
// <Link  to={`/warn`}  style={{borderRight:'none'}} >
// <i alt="warn">F</i>
// </Link>
// <img alt="fire" className="x-mid" src={require('../assets/images/fire.png')} />
// </li>
// <li id="nav-tree"   className="nav" style={{float:'right',width:'60px'}}>
// <Link to={`/tree`} style={{ borderRight:'none'}} >
// <i alt="tree">G</i>
// </Link>
// <img alt="fire" className="x-mid" src={require('../assets/images/fire.png')} />
// </li>