import React from "react";
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ModalManager from "../Models/ModalManager";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modalActions";
function Layout(props) {
  return (
    <>
      <Header />
      <ModalManager closeModal={props.closeModal} />
      {props.children}
      <Footer />
    </>
  );
}

const mapState = (state) => ({  currentModal: state.modals,
});

const actions = {
  closeModal,
};

export default connect(mapState, actions)(Layout);
