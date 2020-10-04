import { Item,  Label } from 'semantic-ui-react';
import React, { useContext, Fragment } from 'react';
import {observer} from 'mobx-react-lite';
import ActivityItem from './activityItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { format } from 'date-fns';


const ActivityList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {activityStore} = rootStore;

    return (

        <Fragment>
        {activityStore.activityListGroupedByDate.map(([date, activities])=>(
            <Fragment key={date}>
                <Label size='large' color='blue'>
                    { format(activities[0].date!, 'eeee do MMMM, YYYY') }
                    
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
