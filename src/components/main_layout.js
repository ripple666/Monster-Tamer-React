import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';


import  {roster_layout} from './roster_layout'

import  {Market}  from '../pages/market'
import  {Hatch}  from '../pages/hatch'
import  {Hatching}  from '../pages/hatching'
import  {Hatched}  from '../pages/hatched'
import  {Fusing}  from '../pages/fusing'
import  {Fused}  from '../pages/fused'
import  {MyAssets}  from '../pages/my-assets'
import  {Attack}  from '../pages/attack'
import  {Attacking} from '../pages/attacking'
import  {MultiAttack} from '../pages/multi-attack'
import  {MultiAttacking} from '../pages/multi-attacking'
import  {MultiAttacked} from '../pages/multi-attacked'
import  {MultiInfo} from '../pages/multi-info'
import  {Attacked} from '../pages/attacked'
import  {Top}  from '../pages/top'
import  {Info}  from '../pages/info'

// import  {Tree}  from '../pages/tree'
// 
import  {Schedule}  from '../pages/Schedule'

export class mainLayout extends Component {
	render() {
		return (
			<main id="main" className="clearfloat" >
			    <Switch>
			      <Route exact path='/'  component={Market}/>
			      <Route path='/hatch' component={Hatch}/>
			      <Route path='/hatching' component={Hatching}/>
			      <Route path='/hatched' component={Hatched}/>
			      <Route path='/my-assets' component={MyAssets}/>
			      <Route path='/attack' component={Attack}/>
			      <Route path='/attacking' component={Attacking}/>
			      <Route path='/attacked' component={Attacked}/>
			      <Route path='/multi-attack' component={MultiAttack}/>
			      <Route path='/multi-attacking' component={MultiAttacking}/>
			      <Route path='/multi-attacked' component={MultiAttacked}/>
			      <Route path='/multi-info' component={MultiInfo}/>
			      <Route path='/fusing' component={Fusing}/>
			      <Route path='/fused' component={Fused}/>
			      <Route path='/top' component={Top}/>
			      <Route path='/info' component={Info}/>
			      <Route path='/roster'  component={roster_layout}/>
			      <Route path='/schedule' component={Schedule}/>
			      
			    </Switch>
			</main>
		);
	}
}

