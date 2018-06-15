import React, { Component } from 'react';
import { Layout } from 'element-react'
import { Link } from 'react-router-dom';

import {setCurNavStyle} from '../utils/api.js'
export class Foot extends Component {
	render() {
		return (
			<div id="foot">
				<div className="content">
					<Layout.Row type="flex" justify="space-between">
						<Layout.Col span="15" className="left">
							<div className="session_1">
								<Link onClick={e =>{setCurNavStyle('market')}} className="market" to={'/'}><span>MARKET</span></Link>
								<Link onClick={e =>{setCurNavStyle('my-assets')}}  className="my-assets" to={'/my-assets'}><span>MY ASSETS</span></Link>
								<Link onClick={e =>{setCurNavStyle('attack')}}  className="attack" to={'/attack'}><span>ATTACK</span></Link>
								<Link onClick={e =>{setCurNavStyle('hatch')}}  className="hactch" to={'/hatch'}><span>HATCH</span></Link>
								<Link onClick={e =>{setCurNavStyle('top')}}  className="top" to={'/top'}><span>TOP</span></Link>
							</div>
							<div className="session_2 clearfloat">
								<Layout.Col span="4" className="left">
									<img alt="logo" src={require('../assets/images/logo_02.png')} />
								</Layout.Col>
								<Layout.Col span="20" className="right">
									<div className="about" >
										<span>USER AGREEMENT</span>
										<span>Privacy Policy</span>
										<span>Terms of Use</span>
									</div>
									<div className="rights">
										Copyright © 2017-2018 MONSTER TAMER. All Rights Reserved
									</div>
									
								</Layout.Col>
							</div>
						</Layout.Col>
						<Layout.Col span="9" className="right" >
							CONTACT: monstertamer@163.com
						</Layout.Col>
					</Layout.Row>
					
				</div>
			</div>
		);
	}
}
