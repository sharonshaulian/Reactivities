import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, GridColumn } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';
import { RouteChildrenProps } from 'react-router-dom';

interface IProps {
    id: string;
}


const ActivityForm: React.FC<RouteChildrenProps<IProps>> = ({match, history}) => {

    const activityStore = useContext(ActivityStore);
    const {
        isFormSubmit,
        clearActivity
    } = activityStore;




    useEffect(() => {
        
        match && activityStore.loadActivity(match!.params.id).then(()=>{
            activityStore.selectedActivity && setActivity(activityStore.selectedActivity);
        });

        return () => {
            clearActivity();
        }

    }, [activityStore, clearActivity, match])


    const [activity, setActivity] = useState<IActivity>(
        {
              id: '',
              title: '',
              description: '',
              category: '',
              date: '',
              city: '',
              venue: ''
        }        
    );

    const handleInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = ev.currentTarget;
        setActivity({...activity, [name]: value});
     }

    const handleFormSubmittion = () => {
        activityStore.handleFormSubmittion(activity)
            .then((resultId)=>{
                history.push(`/activities/${resultId}`);                
            });
    }

    const handleFormCancellation = () => {
        if (activity.id === '')
            history.push(`/activities`);
        else
            history.push(`/activities/${activity.id}`);
    }





    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <Form>
                        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}></Form.Input>
                        <Form.TextArea rows='2' placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}></Form.TextArea>
                        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}></Form.Input>
                        <Form.Input type='datetime-local' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}></Form.Input>
                        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}></Form.Input>
                        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}></Form.Input>
                        <Button loading={isFormSubmit} floated='right' type='submit' content='Submit' positive onClick={() => { handleFormSubmittion(); }}></Button>
                        <Button floated='right' type='button' content='Cancel' onClick={handleFormCancellation} ></Button>
                    </Form>
                </Segment>

            </GridColumn>
            <GridColumn width={16}>

            </GridColumn>

        </Grid>
    );

}

export default observer(ActivityForm);
