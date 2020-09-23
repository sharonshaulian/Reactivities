import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../Features/nav/navBar';
import ActivityDashboard from '../../Features/activities/dashboard/activityDashboard';
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { HomePage } from '../../Features/home/homePage';
import ActivityForm from '../../Features/activities/form/activityForm'
import ActivityDetails from '../../Features/activities/details/activityDetails';
import NotFound from './notFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
      <Fragment>
        <ToastContainer position='bottom-right' />
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} render={()=>(
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>

              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route path={['/createActivity', '/editActivity/:id']} component={ActivityForm} key={location.key} />
                <Route component={NotFound} />
              </Switch>


            </Container>
          </Fragment>
        )} />        
      </Fragment>
    );

}

export default withRouter(observer(App));
