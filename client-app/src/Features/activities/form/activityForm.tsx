import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';

interface IProps {
    //setEditMode: (isEditMode: boolean) => void;
    //selectedActivity: IActivity | null;
    //createActivityHandler: (activity: IActivity) => void;
    //editActivityHandler: (activity: IActivity) => void;
}


const ActivityForm: React.FC<IProps> = ( {} ) => {

    const activityStore = useContext(ActivityStore);
    activityStore.selectedActivity = activityStore.initActivity();


    const handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = ev.currentTarget;
        activityStore.selectedActivity = {...activityStore.selectedActivity!, [name]: value};
    }

    const handleFormSubmittion = () => {

        if (activityStore.selectedActivity!.id)
        {
            activityStore.handleEditActivity(activityStore.selectedActivity!);
        }
        else
        {
            const newActivity = {...activityStore.selectedActivity!, id: uuid() }
            activityStore.handleCreateActivity(newActivity);
        }

        activityStore.selectedActivity = null;
    }


    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activityStore.selectedActivity.title} name='title' onChange={handleChange}></Form.Input>
                <Form.TextArea rows='2' placeholder='Description' value={activityStore.selectedActivity.description} name='description' onChange={handleChange}></Form.TextArea>
                <Form.Input placeholder='Category' value={activityStore.selectedActivity.category} name='category' onChange={handleChange}></Form.Input>
                <Form.Input type='datetime-local' placeholder='Date' value={activityStore.selectedActivity.date} name='date' onChange={handleChange}></Form.Input>
                <Form.Input placeholder='City' value={activityStore.selectedActivity.city} name='city' onChange={handleChange}></Form.Input>
                <Form.Input placeholder='Venue' value={activityStore.selectedActivity.venue} name='venue' onChange={handleChange}></Form.Input>
                <Button loading={activityStore.isFormSubmit} floated='right' type='submit' content='Submit' positive onClick={handleFormSubmittion}></Button>
                <Button floated='right' type='button' content='Cancel' onClick={() => {activityStore.handleFormCancellation()}}></Button>
            </Form>
        </Segment>
    );

}

export default observer(ActivityForm);
