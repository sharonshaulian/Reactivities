import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore';

const ModalContainer = () => {

    const rootStore = useContext(RootStoreContext);
    const modalStore = rootStore.modalStore;
    const {modal:{open, body}, closeModal} = modalStore;

    return (
        <Modal open={open} onClose={closeModal} size='mini'>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    )
}

export default observer(ModalContainer)
