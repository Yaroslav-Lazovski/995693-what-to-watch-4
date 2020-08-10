import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Footer from "../footer/footer.jsx";

import {Operation as UserOperation} from "../../reducer/user/user";
import {getErrorAuthorizationStatus, getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AppRoute, AuthorizationStatus} from "../../consts";

export class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _renderErrorMessage() {
    const {isErrorAuth} = this.props;

    if (isErrorAuth) {
      return (
        <div className="sign-in__message">
          <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
        </div>
      );
    }

    return null;
  }

  _renderRedirectMessage() {
    return (
      <div className="sign-in__message">
        <p>You already authorized. Please return to main page.</p>
      </div>
    );
  }

  _renderSignInBlock() {
    return (
      <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
        {this._renderErrorMessage()}
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              type="email"
              placeholder="Email address"
              name="user-email"
              id="user-email"
              required
              ref={this.loginRef}
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              type="password"
              placeholder="Password"
              name="user-password"
              id="user-password"
              required
              ref={this.passwordRef}
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">Sign in</button>
        </div>
      </form>
    );
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const authorizationStatus = this.props.authorizationStatus;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          {authorizationStatus === AuthorizationStatus.NO_AUTH ? <h1 className="page-title user-page__title">Sign in</h1> : null}
        </header>
        <div className="sign-in user-page__content">
          {authorizationStatus === AuthorizationStatus.AUTH ? this._renderRedirectMessage() : this._renderSignInBlock()}
        </div>
        <Footer />
      </div>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isErrorAuth: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isErrorAuth: getErrorAuthorizationStatus(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(UserOperation.login(authData));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
