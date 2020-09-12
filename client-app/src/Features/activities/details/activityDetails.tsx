import React, { useContext } from 'react';
import { IActivity } from '../../../app/models/activity';
import { Card, Image, Button  } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';

interface IProps {
    //setEditMode: (isEditMode: boolean) => void;
}



const ActivityDetails: React.FC<IProps> = ({ }) => {

  const activityStore = useContext(ActivityStore);

    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activityStore.selectedActivity?.title}</Card.Header>
          <Card.Meta>
            <span>{activityStore.selectedActivity?.date}</span>
          </Card.Meta>
          <Card.Description>
            {activityStore.selectedActivity?.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button basic color='blue' content='Edit' onClick={()=>{activityStore.handleOpenCreateForm(activityStore.selectedActivity)}}></Button>
                <Button basic color='grey' content='Cancel' onClick={()=>{activityStore.handleFormCancellation()}}></Button>
            </Button.Group>
        </Card.Content>
      </Card>     
    );

}

export default observer(ActivityDetails);
