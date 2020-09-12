import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
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
    activityStore.initActivity();

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activityStore.selectedActivity!.title} name='title' onChange={activityStore.handleInputChange}></Form.Input>
                <Form.TextArea rows='2' placeholder='Description' value={activityStore.selectedActivity!.description} name='description' onChange={activityStore.handleInputChange}></Form.TextArea>
                <Form.Input placeholder='Category' value={activityStore.selectedActivity!.category} name='category' onChange={activityStore.handleInputChange}></Form.Input>
                <Form.Input type='datetime-local' placeholder='Date' value={activityStore.selectedActivity!.date} name='date' onChange={activityStore.handleInputChange}></Form.Input>
                <Form.Input placeholder='City' value={activityStore.selectedActivity!.city} name='city' onChange={activityStore.handleInputChange}></Form.Input>
                <Form.Input placeholder='Venue' value={activityStore.selectedActivity!.venue} name='venue' onChange={activityStore.handleInputChange}></Form.Input>
                <Button loading={activityStore.isFormSubmit} floated='right' type='submit' content='Submit' positive onClick={activityStore.handleFormSubmittion}></Button>
                <Button floated='right' type='button' content='Cancel' onClick={() => {activityStore.handleFormCancellation()}}></Button>
            </Form>
        </Segment>
    );

}

export default observer(ActivityForm);
