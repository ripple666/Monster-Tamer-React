import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import {fullRoster as FullRoster} from '../pages/fullRoster'

import {Player} from '../pages/player'

export class roster_layout extends Component {
	render() {
		return (
			<div>
			    <h3>This is a roster page!</h3>
			    <Switch>
			      <Route exact path='/roster' component={FullRoster}/>
			      <Route path='/roster/:id' component={Player}/>
			    </Switch>
			</div>
		);
	}
}