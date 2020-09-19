import React, { useContext, useEffect } from 'react';
import { GridColumn, Grid  } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../loadingComponent/loadingComponent';
import { ActivityDetailsHeader } from './activityDetailsHeader';
import ActivityDetailsInfo from './activityDetailsInfo';
import { ActivityDetailsChat } from './activityDetailsChat';
import { ActivityDetailsSidebar } from './activityDetailsSidebar';

interface IProps {
    //setEditMode: (isEditMode: boolean) => void;
    id: string;
}



const ActivityDetails: React.FC<RouteComponentProps<IProps>> = ({match, history}) => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivity(match.params.id);
  }, [activityStore, match.params.id]);

  
    if (activityStore.initialLoading || !activityStore.selectedActivity) return (<LoadingComponent isInverted={true} content='Loading Activities ...'/>);

    return (
      <Grid>
        <GridColumn width={10}>
          <ActivityDetailsHeader activity={activityStore.selectedActivity!} />
          <ActivityDetailsInfo activity={activityStore.selectedActivity!} />
          <ActivityDetailsChat />
        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailsSidebar/>
        </GridColumn>



      </Grid>
    );

}

export default observer(ActivityDetails);
