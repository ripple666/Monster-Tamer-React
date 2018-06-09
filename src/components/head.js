import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo_1.png';


import setIcon from '../assets/images/icon_setting.png'
const pathToRegexp = require('path-to-regexp')

export class head extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 

	    };
	}

	componentDidMount(){
		var keys= []
		pathToRegexp('/hatch', keys)
		// const path = props.match.params.number
	}

	render() {
		return (
			<div id="head">
				<div className="logo-cnt main">
					<div className="account clearfloat">
						<span className="">
							<span>nickName</span>
							<img alt='set' src={setIcon}/>
						</span>
					</div>
					<img alt="logo"  className={logo} src={logo} />
				</div>
				<div className="navs">
					<div className="nav-container clearfloat ">
						{this.props.navs.map((nav) =>
							<li  key={nav.path.split('/')[1] ? nav.path.split('/')[1] : 'market'} id={'nav-'+nav.name}  className="nav" >
							  <Link to={`${nav.path}`}>
							  	<i alt={nav.name} >{nav.icon}</i>
							  </Link>
							  <img alt="fire" className="x-mid" src={require('../assets/images/fire.png')} />
							</li>
						)}
						<li id="nav-warn"   className="nav" style={{float:'right',width:'60px'}}>
							<Link  to={`/warn`}  style={{borderRight:'none'}} >
								<i alt="warn">F</i>
							</Link>
							<img alt="fire" className="x-mid" src={require('../assets/images/fire.png')} />
						</li>
						<li id="nav-tree"   className="nav" style={{float:'right',width:'60px'}}>
							<Link to={`/tree`} style={{ borderRight:'none'}} >
								<i alt="tree">G</i>
							</Link>
							<img alt="fire" className="x-mid" src={require('../assets/images/fire.png')} />
						</li>
					</div>
				</div>
			</div>
		);
	}
}
