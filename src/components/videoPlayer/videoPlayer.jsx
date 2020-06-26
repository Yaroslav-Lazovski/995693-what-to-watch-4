import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {src, poster, muted} = this.props;
    const video = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = poster;
      video.muted = muted;
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
    const {src, poster, muted} = this.props;

    return <video
      className={`player__video`}
      ref={this._videoRef}
      muted={muted}
      src={src}
      poster={poster}
    />;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
};

export default VideoPlayer;
