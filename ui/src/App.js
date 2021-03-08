import React, { Suspense }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from '../src/containers/Auth/auth';
import UserTable from './components/Navbar/UserTable'
import Ammunationtable from './components/Navbar/Ammunitiontable'
import CompaniesTable from './components/Navbar/CompaniesTable'
import RecoveryTable from './components/Navbar/RecoveryTable'
import StationsTable from './components/Navbar/StationsTable'
import WeaponsTable from './components/Navbar/WeaponsTable'
import WeaponsModel from './components/Navbar/WeaponModel'
import AmmunitionModel from './components/Navbar/AmmunitionModels'
import WeaponsCentralized from './components/Navbar/WeaponCentralized'
import AmmunitionCentralized from './components/Navbar/AmmunitionCentralized'
import MaintenanceTable from './components/Navbar/MaintenanceTable'
import ResetPasswordTable from './components/Navbar/ResetPassword'
import RecoveredItems from './components/Navbar/RecoverViewTable'
import CenStations from './components/Navbar/CENStations'
import CenRecovery from './components/Navbar/CENRecoverTale'
import CenMaintenance from './components/Navbar/CENMaintenance'
import WeaponDetails from './components/Navbar/WeaponDetails'
import CompanyDetails from './components/Navbar/CompanyDetails'
import Request from './components/Navbar/Request'
import Orders from './components/Navbar/ViewOrders'
import ViewRequest from './components/Navbar/ViewRequest'
import orderDetail from './components/Navbar/orderDetail'

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
        <Route exact path={routez.WEAPONMODELS} component={WeaponsModel}/>
        <Route exact path={routez.AMMUNITIONMODELS} component={AmmunitionModel}/>
        <Route exact path={routez.WEAPONSCEN} component={WeaponsCentralized}/>
        <Route exact path={routez.AMMUNATIONSCEN} component={AmmunitionCentralized}/>
        <Route exact path={routez.MAINTENANCE} component={MaintenanceTable}/>
        <Route exact path={routez.USERS_DETAIL} component={ResetPasswordTable}/>
        <Route exact path={routez.RECOVERY_DETAIL} component={RecoveredItems}/>
        <Route exact path={routez.CENSTATIONS} component={CenStations}/>
        <Route exact path={routez.CENRECOVERY} component={CenRecovery}/>
        <Route exact path={routez.WEAPON_DETAIL} component={WeaponDetails}/>
        <Route exact path={routez.COMPANY_DETAIL} component={CompanyDetails}/>
        <Route exact path={routez.CENMAINTENANCE} component={CenMaintenance}/>
        <Route exact path={routez.REQUEST} component={Request}/>
        <Route exact path={routez.VIEWORDERS} component={Orders}/>
        <Route exact path={routez.VIEWREQUEST} component={ViewRequest}/>
        <Route exact path={routez.ORDERDETAILS} component={orderDetail}/>
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
