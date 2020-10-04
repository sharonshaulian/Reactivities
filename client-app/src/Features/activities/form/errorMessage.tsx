import { AxiosResponse } from 'axios'
import { getPlainObjectKeys } from 'mobx/lib/internal'
import React from 'react'
import { Message } from 'semantic-ui-react'


interface IProps {
    error: AxiosResponse,
    text: string,
}


export const ErrorMessage:React.FC<IProps> = ({error, text}) => {
    return (
        <Message error>
            <Message.Header>{error.data.title}({error.status})</Message.Header>

            { error.data && Object.keys(error.data.errors).length > 0 && (
                <Message.List>
                    
                    {Object.values(error.data.errors).flat().map((itm:any,idx) => (
                        <Message.Item key={idx}>{itm}</Message.Item>
                    ))}

                </Message.List>
            )}

        </Message>
    )
}
