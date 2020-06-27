import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: this.props.isPlaying
    };
  }

  componentDidMount() {
    const {src, poster} = this.props;
    const video = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = poster;
      video.muted = true;
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    if (video) {
      video.onplay = null;
      video.muted = null;
      video.src = ``;
      video.poster = ``;
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (video) {
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }

  render() {
    const {src, poster} = this.props;

    return <video
      className="player__video"
      ref={this._videoRef}
      src={src}
      poster={poster}
    />;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
