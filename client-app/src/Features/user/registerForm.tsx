import { FORM_ERROR, ValidationErrors } from 'final-form';
import React, { useContext } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Field, Form as FinalForm} from 'react-final-form'
import { TextInput } from '../../app/common/form/textInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import { ErrorMessage } from '../activities/form/errorMessage';
import { combineValidators, isRequired, matchesField } from 'revalidate';




const validate = combineValidators({
    email: isRequired('email'),
    username: isRequired('username'),
    displayname: isRequired('displayname'),
    password: isRequired('password'),
    repassword: matchesField('password', '')({
        message: 'Passwords do not match',
      }),
})



export const RegisterForm: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {register} = rootStore.userStore;

    return (

        <FinalForm
            validate={validate}
            onSubmit={(values: IUserFormValues) =>
                register(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
                render={({
                    handleSubmit,
                    submitting,
                    submitError,
                    invalid,
                    pristine,
                    dirtySinceLastSubmit,
                    form
                  }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header content="Sign up to Reactivities" color='teal' as='h2' textAlign='center' />                    
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='username'
                        component={TextInput}
                        placeholder='User Name'
                    />
                    <Field
                        name='displayname'
                        component={TextInput}
                        placeholder='Display Name'
                    />                                        
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    <Field
                        name='repassword'
                        component={TextInput}
                        placeholder='Retype Password'
                        type='password'
                    />                    
                    {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text={JSON.stringify(submitError.data.errors)} />}
                    <Button loading={submitting} color='teal' fluid={true} content="Register" disabled={invalid && !dirtySinceLastSubmit || pristine}/>
                </Form>
            )}


        />

    )
}


