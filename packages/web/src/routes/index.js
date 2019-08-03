import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

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

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/create" component={CreateMeetup} isPrivate />
      <Route path="/meetup" component={Meetup} isPrivate />
      <Route path="/edit" component={EditMeetup} isPrivate />
    </Switch>
  );
}
