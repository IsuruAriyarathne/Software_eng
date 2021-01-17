import React, { Suspense }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from '../src/containers/Auth/auth';
import UserTable from './components/Navbar/UserTable'
import Ammunationtable from './components/Navbar/Ammunitiontable'
import CompaniesTable from './components/Navbar/CompaniesTable'
import RecoveryTable from './components/Navbar/RecoveryTable'
import StationsTable from './components/Navbar/StationsTable'
import WeaponsTable from './components/Navbar/WeaponsTable'

import * as routez from './shared/routes';

import './App.css';

function App() {

  let routes = (
    <Suspense >
      <Switch>
        <Route exact path={routez.SIGNIN} component={SignIn}/>
        <Route exact path={routez.USERS} component={UserTable}/>
        <Route exact path={routez.AMMUNATIONS} component={Ammunationtable}/>
        <Route exact path={routez.COMPANIES} component={CompaniesTable}/>
        <Route exact path={routez.RECOVERY} component={RecoveryTable}/>
        <Route exact path={routez.STATIONS} component={StationsTable}/>
        <Route exact path={routez.WEAPONS} component={WeaponsTable}/>
        <Redirect path="/" to={routez.SIGNIN} />
      </Switch>
    </Suspense>
  );


  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
