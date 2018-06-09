import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';


import  {roster_layout} from './roster_layout'

import  {Market}  from '../pages/market'
import  {Hatch}  from '../pages/hatch'
import  {Hatching}  from '../pages/hatching'
import  {MyAssets}  from '../pages/my-assets'
import  {Attack}  from '../pages/attack'
import  {Attacking} from '../pages/attacking'
import  {Attacked} from '../pages/attacked'
import  {Top}  from '../pages/top'

// import  {Tree}  from '../pages/tree'
// 
import  {Schedule}  from '../pages/Schedule'

export class mainLayout extends Component {
	render() {
		return (
			<main id="main" className="clearfloat">
			    <Switch>
			      <Route exact path='/'  component={Market}/>
			      <Route path='/hatch' component={Hatch}/>
			      <Route path='/hatching' component={Hatching}/>
			      <Route path='/my-assets' component={MyAssets}/>
			      <Route path='/attack' component={Attack}/>
			      <Route path='/attacking' component={Attacking}/>
			      <Route path='/attacked' component={Attacked}/>
			      <Route path='/top' component={Top}/>
			      <Route path='/roster'  component={roster_layout}/>
			      <Route path='/schedule' component={Schedule}/>
			      
			    </Switch>
			</main>
		);
	}
}

