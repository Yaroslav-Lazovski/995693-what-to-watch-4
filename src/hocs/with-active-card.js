import React, {PureComponent} from "react";


const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null
      };

      this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
      this._handleMovieCardMouseLeave = this._handleMovieCardMouseLeave.bind(this);
    }

    _handleMovieCardMouseEnter(id) {
      this.setState({
        activeCard: id
      });
    }

    _handleMovieCardMouseLeave() {
      this.setState({
        activeCard: null
      });
    }

    render() {
      const {activeCard} = this.state;

      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          onMouseEnter={this._handleMovieCardMouseEnter}
          onMouseLeave={this._handleMovieCardMouseLeave}
        />
      );
    }
  }

  return WithActiveCard;
};


export default withActiveCard;
