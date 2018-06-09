import React, { Component } from 'react';
import { Layout } from 'element-react'
import { Link } from 'react-router-dom';

export class Foot extends Component {
	render() {
		return (
			<div id="foot">
				<div className="content">
					<Layout.Row type="flex" justify="space-between">
						<Layout.Col span="18" className="left">
							<div className="session_1">
								<Link className="market" to={{
								  pathname: '/attacking/1',
								  search: '?sort=name&id=17',
								  hash: '1',
								  state: { fromDashboard: true }
								}}><span>MARKET</span></Link>
								<Link className="my-assets" to={'/my-assets'}><span>MY ASSETS</span></Link>
								<Link className="attack" to={'/attack'}><span>ATTACK</span></Link>
								<Link className="hactch" to={'/hactch'}><span>HACTCH</span></Link>
								<Link className="top" to={'/top'}><span>TOP</span></Link>
							</div>
							<div className="session_2 clearfloat">
								<Layout.Col span="4" className="left">
									<img alt="logo" src={require('../assets/images/logo_02.png')} />
								</Layout.Col>
								<Layout.Col span="20" className="right">
									<div className="about">
										<Link  to={'/user-agreement'}><span>USER AGREEMENT</span></Link>
										<Link  to={'/privacy-polig'}><span>Privacy Policy</span></Link>
										<Link  to={'/market'}><span>Terms of Use</span></Link>
									</div>
									<div className="rights">
										Copyright © 2017-2018 DINOSAUR PARK. All Rights Reserved
									</div>
									
								</Layout.Col>
							</div>
						</Layout.Col>
						<Layout.Col span="6" className="right">
							<Link className="park" to={'/park'}>PARK</Link>
							<Link className="ACYIVITY" to={'/acyivity'}>ACYIVITY</Link>
						</Layout.Col>
					</Layout.Row>
					
				</div>
			</div>
		);
	}
}
