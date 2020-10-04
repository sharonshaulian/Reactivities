import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './activityList';
import {observer} from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';




const ActivityDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {activityStore} = rootStore;

    //
    useEffect(()=>{
        activityStore.loadActivities();
    }, [activityStore]);

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <h2>Activity filter</h2>
            </GridColumn>
        </Grid>
    );

}

export default observer(ActivityDashboard);
