import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import VideoPlayer from "../video-player/video-player.jsx";

import {ActionCreator} from "../../reducer/state/state";

const VIDEO_DELAY = 1000;


export class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._videoDelay = null;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }


  componentWillUnmount() {
    clearTimeout(this._videoDelay);
  }

  _handleTitleClick(evt) {
    const {movie: {id}, onTitleClick} = this.props;

    evt.preventDefault();
    onTitleClick(id);
  }

  _handlePosterClick(evt) {
    const {movie: {id}, onPosterClick} = this.props;

    evt.preventDefault();
    onPosterClick(id);
  }


  _handleMouseEnter() {
    const {movie: {id}, onMouseEnter, onStartPlaying} = this.props;

    this._videoDelay = setTimeout(onStartPlaying, VIDEO_DELAY);

    onMouseEnter(id);
  }

  _handleMouseLeave() {
    const {onMouseLeave, onStopPlaying} = this.props;

    if (this._videoDelay) {
      clearTimeout(this._videoDelay);

      onStopPlaying();
    }

    onMouseLeave();
  }


  render() {
    const {movie, isPlaying} = this.props;
    const {title, poster, preview} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onClick={this._handlePosterClick}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={isPlaying}
            src={preview}
            poster={poster}
          />
          <img src={poster} alt={title} width="280" height="175" />
        </div>
        <h3
          className="small-movie-card__title"
        >
          <a
            className="small-movie-card__link"
            href="movie-page.html"
            onClick={this._handleTitleClick}
          >
            {title}
          </a>
        </h3>
      </article>
    );
  }
}


SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onStartPlaying: PropTypes.func.isRequired,
  onStopPlaying: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onPosterClick(id) {
    dispatch(ActionCreator.getActiveMovieId(id));
  },
});

export default connect(null, mapDispatchToProps)(SmallMovieCard);
