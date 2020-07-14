import React, {PureComponent} from "react";


const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._handleStartPlaying = this._handleStartPlaying.bind(this);
      this._handleStopPlaying = this._handleStopPlaying.bind(this);
    }

    _handleStartPlaying() {
      this.setState({
        isPlaying: true
      });
    }

    _handleStopPlaying() {
      this.setState({
        isPlaying: false
      });
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onStartPlaying={this._handleStartPlaying}
          onStopPlaying={this._handleStopPlaying}
        />
      );
    }
  }

  return WithVideoPlayer;
};


export default withVideoPlayer;
