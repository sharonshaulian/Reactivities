import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../Features/nav/navBar';
import ActivityDashboard from '../../Features/activities/dashboard/activityDashboard';
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { HomePage } from '../../Features/home/homePage';
import ActivityForm from '../../Features/activities/form/activityForm'
import ActivityDetails from '../../Features/activities/details/activityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} render={()=>(
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route path={['/createActivity', '/editActivity/:id']} component={ActivityForm} key={location.key} />
            </Container>
          </Fragment>
        )} />        
      </Fragment>
    );

}

export default withRouter(observer(App));
