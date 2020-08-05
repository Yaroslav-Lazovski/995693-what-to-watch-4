import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation as DataOperations} from "../reducer/data/data.js";
import {getActiveMovie} from "../reducer/state/selectors";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    _handleRatingChange(evt) {
      const {name, value} = evt.target;

      this.setState({
        [name]: value,
      });
    }

    _handleSubmit(evt) {
      const {onSubmit, movie} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();

      onSubmit(movie.id, {
        rating,
        comment
      });
    }

    _handleCommentChange(evt) {
      const comment = evt.target.value;

      this.setState({
        comment,
      });
    }

    render() {
      const {rating} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        onRatingChange={this._handleRatingChange}
        onCommentChange={this._handleCommentChange}
        onSubmit={this._handleSubmit}
      />;
    }
  }

  WithReview.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  };

  const mapStateToProps = (state) => ({
    movie: getActiveMovie(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmit(review, id) {
      dispatch(DataOperations.postComment(review, id));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
