import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';


import  {roster_layout} from './roster_layout'

import  {Market}  from '../pages/market'
import  {Hatch}  from '../pages/hatch'
import  {MyAssets}  from '../pages/my-assets'
import  {Attack}  from '../pages/attack'
import  {Top}  from '../pages/top'
// import  {Tree}  from '../pages/tree'


import  {Schedule}  from '../pages/Schedule'


export class mainLayout extends Component {
	render() {
		return (
			<main id="main" className="clearfloat">
			    <Switch>
			      <Route exact path='/'  component={Market}/>
			      <Route path='/hatch' component={Hatch}/>
			      <Route path='/my-assets' component={MyAssets}/>
			      <Route path='/attack' component={Attack}/>
			      <Route path='/top' component={Top}/>
			      <Route path='/roster'  component={roster_layout}/>
			      <Route path='/schedule' component={Schedule}/>
			    </Switch>
			</main>
		);
	}
}

