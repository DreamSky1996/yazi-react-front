import React from 'react'
import { connect } from 'react-redux'
import Chat from "./Chat";
const modalLookup = {
  Chat,
}

const mapState = (state) => ({
  currentModal: state.modals
})

const ModalManager = (props) => {
  let renderedModal;
  const currentModal=props.currentModal
  if (currentModal) {
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent closeModal={props.closeModal} {...modalProps}/>
  }
  return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager)
