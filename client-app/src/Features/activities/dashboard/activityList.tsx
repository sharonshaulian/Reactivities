import { Item,  Label } from 'semantic-ui-react';
import React, { useContext, Fragment } from 'react';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';
import ActivityItem from './activityItem';


const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivityStore);

    return (

        <Fragment>
        {activityStore.activityListGroupedByDate.map(([date, activities])=>(
            <Fragment key={date}>
                <Label size='large' color='blue'>
                    {date}
                </Label>
                    <Item.Group divided>
                        {activities.map((a)=>(
                                <ActivityItem key={a.id} activity={a} />
                        ))}
                    </Item.Group>
            </Fragment>
        ))}
        </Fragment>
    );

}

export default observer(ActivityList);
