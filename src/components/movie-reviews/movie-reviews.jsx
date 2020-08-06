import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import MovieReview from "../movie-review/movie-review.jsx";
import Preloader from "../preloader/preloader.jsx";

import {getComments, getLoadingCommentsState} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getActiveMovie} from "../../reducer/state/selectors.js";

export class MovieReviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {movie, getMovieComments} = this.props;

    getMovieComments(movie.id);
  }

  componentDidUpdate(prevProps) {
    const {getMovieComments, movie} = this.props;

    if (prevProps.movie.id !== movie.id) {
      getMovieComments(movie.id);
    }
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
    const {reviews, isLoadingComments} = this.props;

    const halfReviews = Math.ceil(reviews.length / 2);
    const firstColumn = reviews.slice(0, halfReviews);
    const secondColumn = reviews.slice(halfReviews);

    return !isLoadingComments ? (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {this._renderReviews(firstColumn)}
        </div>
        <div className="movie-card__reviews-col">
          {this._renderReviews(secondColumn)}
        </div>
      </div>
    ) : <Preloader />;
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
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  getMovieComments: PropTypes.func.isRequired,
  isLoadingComments: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getComments(state),
  movie: getActiveMovie(state),
  isLoadingComments: getLoadingCommentsState(state)
});

const mapDispatchToProps = (dispatch) => ({
  getMovieComments(id) {
    dispatch(DataOperation.loadMovieComments(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
