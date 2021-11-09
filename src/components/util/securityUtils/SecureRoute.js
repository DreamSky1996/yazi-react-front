import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => {

  const isBuyer = otherProps.location.pathname === "/add-product" && otherProps.userType === "buyer"

    return (
    <Route
      {...otherProps}
      render={(props) =>
        // !isBuyer && security.userLoggedIn === true ? (
        !isBuyer ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.user,
  userType: state.user.type,
});

export default connect(mapStateToProps)(SecuredRoute);
