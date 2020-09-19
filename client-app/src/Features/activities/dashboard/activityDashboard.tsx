import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './activityList';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';



const ActivityDashboard: React.FC = () => {

    const activityStore = useContext(ActivityStore);

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
