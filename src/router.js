import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Listing from './components/Listing/Listing';
import Profile from './components/Profile/Profile';
import Restaurant from './components/Restaurant/Restaurant';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/listing' component={Listing} />
        <Route path='/profile/:id' component={Profile} />
        <Route path='/restaurant/:id' component={Restaurant} />
    </Switch>
)