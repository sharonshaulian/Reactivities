import { IActivity } from '../../../app/models/activity';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import React, { useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';


const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivityStore);

    return (
        <Segment clearing>
        <Item.Group divided>

        {activityStore.activityListByDate.map((activity)=>(
            <Item key={activity.id}>
                <Item.Content>
                    <Item.Header as='a'>{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                    <Item.Description>
                        <div>{activity.description}</div>
                        <div>{activity.city}, {activity.venue}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button floated='right' content='View' color='blue' onClick={() => activityStore.handleSelectActivity(activity.id)}></Button>
                        <Button name={activity.id}
                                loading={activityStore.submmittingButtonId === activity.id}
                                floated='right'
                                content='Delete'
                                color='red'
                                onClick={(e) => activityStore.handleDeleteActivity(e, activity.id)}>
                        </Button>
                        <Label basic>{activity.category}</Label>
                    </Item.Extra>
                </Item.Content>
            </Item>
        ))}

      </Item.Group>        
      </Segment>      
    );

}

export default observer(ActivityList);
