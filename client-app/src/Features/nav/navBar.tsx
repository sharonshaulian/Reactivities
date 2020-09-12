import React, { useContext } from 'react';
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../src/app/stores/activityStore';


interface IProps {
    //openCreateFormHandler: () => void;
}



const NavBar:React.FC<IProps> = () => {


    const activityStore = useContext(ActivityStore);
    

    return (
       <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight:'10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={() => activityStore.handleOpenCreateForm(null)}></Button>
                </Menu.Item>
            </Container>
      </Menu>
    );

}

export default observer(NavBar);
