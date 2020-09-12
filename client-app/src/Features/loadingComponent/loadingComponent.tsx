import React from 'react';
import { Segment, Dimmer, Loader } from "semantic-ui-react";


interface IProps {
    isInverted?: boolean;
    content: string;
}


const LoadingComponent:React.FC<IProps> = ({isInverted = false, content = 'Loading ...'}) => {

    return (
        <Dimmer active inverted={isInverted}>
          <Loader content={content} />
        </Dimmer>
    );

}

export default LoadingComponent;
