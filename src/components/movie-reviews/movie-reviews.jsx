import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import MovieReview from "../movie-review/movie-review.jsx";

import {getComments} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getActiveMovieId} from "../../reducer/state/selectors.js";

export class MovieReviews extends PureComponent {
  componentDidMount() {
    this._loadComments();
  }

  _loadComments() {
    const {getMovieComments, activeMovieId} = this.props;

    getMovieComments(activeMovieId);
  }

  _getReview(review, index) {
    const key = `${review.id}-${index}`;

    return (
      <MovieReview
        key={key}
        review={review}
      />
    );
  }

  renderReviews(columnReviews) {
    return columnReviews.map(this._getReview);
  }

  render() {
    const {reviews} = this.props;

    const halfReviews = Math.ceil(reviews.length / 2);
    const firstColumn = reviews.slice(0, halfReviews);
    const secondColumn = reviews.slice(halfReviews);

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {this.renderReviews(firstColumn)}
        </div>
        <div className="movie-card__reviews-col">
          {this.renderReviews(secondColumn)}
        </div>
      </div>
    );
  }
}

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  activeMovieId: PropTypes.number.isRequired,
  getMovieComments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getComments(state),
  activeMovieId: getActiveMovieId(state)
});

const mapDispatchToProps = (dispatch) => ({
  getMovieComments(id) {
    dispatch(DataOperation.loadMovieComments(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
