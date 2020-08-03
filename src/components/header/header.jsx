import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AuthorizationStatus} from '../../consts';

export const Header = (props) => {
  const {authorizationStatus} = props;

  const renderUserBlock = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return (
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
      );
    }

    return (
      <a href="sign-in.html" className="user-block__link">Sign in</a>
    );
  };

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
      <div className="user-block">
        {renderUserBlock()}
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});


export default connect(mapStateToProps)(Header);
