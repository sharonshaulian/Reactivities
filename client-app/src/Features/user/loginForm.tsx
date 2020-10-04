import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import { Field, Form as FinalForm} from 'react-final-form'
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/textInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import { ErrorMessage } from '../activities/form/errorMessage';



const isValidEmail = createValidator(
    message => value => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message
      }
    },
    'Invalid email address'
  )


const validate = combineValidators({
    email: composeValidators(
        isRequired('email'),
        isValidEmail('email')
    )('email'),
    password: isRequired('password')
})


export const LoginForm = () => {


    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;

    return (

        <FinalForm
            validate={validate}
            onSubmit={(values: IUserFormValues) =>
                login(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
                render={({
                    handleSubmit,
                    submitting,
                    submitError,
                    invalid,
                    pristine,
                    dirtySinceLastSubmit
                  }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header content="Login to Reactivities" color='teal' as='h2' textAlign='center' />                    
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text='Invalid Email / Password' />}
                    <Button loading={submitting} color='teal' fluid={true} content="Login" disabled={invalid && !dirtySinceLastSubmit || pristine}/>
                </Form>
            )}


        />

    )
}
