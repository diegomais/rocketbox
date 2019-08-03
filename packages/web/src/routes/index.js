import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Meetup from '../pages/Meetup';
import CreateMeetup from '../pages/CreateMeetup';
import EditMeetup from '../pages/EditMeetup';

export default function services() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create" component={CreateMeetup} />
      <Route path="/meetup" component={Meetup} />
      <Route path="/edit" component={EditMeetup} />
    </Switch>
  );
}
