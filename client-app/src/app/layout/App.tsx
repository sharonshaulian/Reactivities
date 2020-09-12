import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity'
import NavBar from '../../Features/nav/navBar';
import ActivityDashboard from '../../Features/activities/dashboard/activityDashboard';
import LoadingComponent from '../../Features/loadingComponent/loadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';


const App = () => {

    //
    const activityStore = useContext(ActivityStore);

    //
    useEffect(()=>{
      activityStore.loadActivities();
    }, [ActivityStore]);

    if (activityStore.initialLoading) return (<LoadingComponent isInverted={true} content='Loading Activities ...'/>);

    return (
      <Fragment>
        <NavBar />
        <Container style={{marginTop:'7em'}}>
          <ActivityDashboard />
        </Container>
      </Fragment>
    );

}

export default observer(App);
