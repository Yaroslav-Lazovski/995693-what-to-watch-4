import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import VideoPlayer from "../video-player/video-player.jsx";

import {AppRoute} from "../../consts";

const VIDEO_DELAY = 1000;


class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._videoDelay = null;

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }


  componentWillUnmount() {
    clearTimeout(this._videoDelay);
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
    const {id, title, poster, preview} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <Link to={`${AppRoute.FILM}/${id}`}>
          <div className="small-movie-card__image">
            <VideoPlayer
              isPlaying={isPlaying}
              src={preview}
              poster={poster}
              muted={true}
            />
            <img src={poster} alt={title} width="280" height="175"/>
          </div>
        </Link>
        <h3 className="small-movie-card__title">
          <Link to={`${AppRoute.FILM}/${id}`} className="small-movie-card__link">{title}</Link>
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
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onStartPlaying: PropTypes.func.isRequired,
  onStopPlaying: PropTypes.func.isRequired,
};


export default SmallMovieCard;
