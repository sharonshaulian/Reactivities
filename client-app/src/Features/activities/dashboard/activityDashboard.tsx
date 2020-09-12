import React, { useContext } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './activityList';
import ActivityDetails from '../details/activityDetails';
import ActivityForm from '../form/activityForm';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';


interface IProps {
}



const ActivityDashboard: React.FC<IProps> = ({ }) => {

    const activityStore = useContext(ActivityStore);

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                {activityStore.selectedActivity && !activityStore.editMode && 
                    <ActivityDetails />}
                {activityStore.editMode && 
                    <ActivityForm 
                        key={activityStore.selectedActivity && activityStore.selectedActivity.id || 0}
                     />}
            </GridColumn>
        </Grid>
    );

}

export default observer(ActivityDashboard);
