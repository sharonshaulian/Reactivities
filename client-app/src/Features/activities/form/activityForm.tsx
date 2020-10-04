import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, GridColumn, TextArea } from 'semantic-ui-react';
import { IActivity, ActivityFormValues } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';
import { RouteChildrenProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form'
import { TextInput } from '../../../app/common/form/textInput';
import { TextAreaInput } from '../../../app/common/form/textAreaInput';
import { SelectInput } from '../../../app/common/form/selectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { DateInput } from '../../../app/common/form/dateInput';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate'
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    
    title: isRequired({message: 'The event title is Required'}),
    
    category: isRequired('Category'),
    
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message:'Description needs to be at least 5 characters'})
    )('Description'),
    
    date: isRequired('Date'),

    city: isRequired('City'),
    
    venue: isRequired('Venue')

})







interface IProps {
    id: string;
}


const ActivityForm: React.FC<RouteChildrenProps<IProps>> = ({match, history}) => {

    const rootStore = useContext(RootStoreContext);
    const {activityStore} = rootStore;
    
    const {
        isFormSubmit,
        clearActivity
    } = activityStore;


    useEffect(() => {
        if (match && match.params.id) {
            setLoading(true);        

            activityStore.loadActivity(match.params.id).then((activity)=>{
                setActivity( new ActivityFormValues(activity) );
            }).finally(()=>{ setLoading(false) });
        }
    }, [activityStore.loadActivity, match?.params.id])


    const [activity, setActivity] = useState( new ActivityFormValues() );
    const [loading, setLoading] = useState(false);

    // const handleInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const {name, value} = ev.currentTarget;
    //     setActivity({...activity, [name]: value});
    //  }


    const handleFormCancellation = () => {
        if (activity.id === '')
            history.push(`/activities`);
        else
            history.push(`/activities/${activity.id}`);
    }

    const handleFinalFormSubmit = (activity: IActivity) => {
        console.log(activity);
        activityStore.handleFormSubmittion(activity)
            .then((resultId)=>{
                history.push(`/activities/${resultId}`);                
            });        
    }



    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <FinalForm
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <Form loading={loading} onSubmit={handleSubmit}>
                                <Field placeholder='Title' value={activity.title} name='title' component={TextInput} />
                                <Field rows='2' placeholder='Description' value={activity.description} name='description' component={TextAreaInput}></Field>
                                <Field placeholder='Category' value={activity.category} name='category' component={SelectInput} options={category}></Field>
                                
                                <Form.Group widths='equal'>
                                    <Field
                                        component={DateInput}
                                        name='date'
                                        date={true}
                                        time={true}
                                        placeholder='Date'
                                        value={activity.date}
                                    />
                                </Form.Group>

                                <Field placeholder='City' value={activity.city} name='city' component={TextInput}></Field>
                                <Field placeholder='Venue' value={activity.venue} name='venue' component={TextInput}></Field>
                                <Button disabled={loading} loading={isFormSubmit} floated='right' type='submit' content='Submit' positive ></Button>
                                <Button disabled={loading} floated='right' type='button' content='Cancel' onClick={handleFormCancellation} ></Button>
                            </Form>
                        )}
                    />

                </Segment>

            </GridColumn>
            <GridColumn width={6}>

            </GridColumn>

        </Grid>
    );

}

export default observer(ActivityForm);
