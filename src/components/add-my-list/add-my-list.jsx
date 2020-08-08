import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation as DataOperation} from "../../reducer/data/data";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import history from "../../history";
import {AppRoute, AuthorizationStatus} from "../../consts";

export const AddMyList = (props) => {
  const {id, isFavorite, authorizationStatus, onFavoriteButtonClick} = props;

  const handleFavoriteButtonClick = () => {
    return authorizationStatus === AuthorizationStatus.AUTH
      ? onFavoriteButtonClick(id, Number(!isFavorite))
      : history.push(AppRoute.LOGIN);
  };

  return (
    <button onClick={() => handleFavoriteButtonClick()} className="btn btn--list movie-card__button" type="button">
      {isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"/>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

AddMyList.propTypes = {
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(id, isFavorite) {
    dispatch(DataOperation.postFavoriteMovie(id, isFavorite));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMyList);
