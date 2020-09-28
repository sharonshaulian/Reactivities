import React, { useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Input } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets'
import Helpers from '../../helpers/helpers';


interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
    input, width, placeholder, meta: { touched, error }, rest 
    }) => {

    return (
        <Form.Field error={touched && !!error} width={width}>

            <DateTimePicker 
                format='dd-MM-YYYY HH:mm:ss' 
                value={input.value || null} 
                onChange={input.onChange} 
                placeholder={placeholder} 
                onBlur={input.onBlur}
                onKeyDown={(e) => e.preventDefault()}
                {...rest} />
            {/* <Input type='datetime-local' name='date' {...rest} value={input.value}></Input> */}


            {touched && error && 
                (<Label basic color='red'>
                    {error}
                </Label>)
            }

        </Form.Field>

        )
}
