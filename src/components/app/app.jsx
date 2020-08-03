import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import NewReview from '../new-review/new-review.jsx';
import withTabs from "../../hocs/with-tabs.js";
import withReview from "../../hocs/with-review.js";

import {ActionCreator} from "../../reducer/state/state.js";
import {getActiveMovieId} from "../../reducer/state/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import reviews from "../../mocks/reviews.js";


const MoviePageWrapped = withTabs(MoviePage);
const NewReviewWrapped = withReview(NewReview);


export class App extends PureComponent {
  constructor(props) {
    super(props);


    this._handleMovieTitleClick = this._handleMovieTitleClick.bind(this);
  }

  _handleMovieTitleClick(id) {
    this.props.onMovieTitleClick(id);
  }


  _renderMain() {
    return (
      <Main
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderMoviePage() {
    return (
      <MoviePageWrapped
        reviews={reviews}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderApp() {
    const {activeMovieId} = this.props;

    if (!activeMovieId) {
      return this._renderMain();
    }

    return this._renderMoviePage();
  }


  render() {
    const {login} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
          <Route exact path="/auth">
            <SignIn
              onSubmit={login}
            />
          </Route>
          <Route exact path={`/dev-review`}>
            <NewReviewWrapped />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeMovieId: PropTypes.number,
  login: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activeMovieId: getActiveMovieId(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieTitleClick(id) {
    dispatch(ActionCreator.getActiveMovieId(id));
  },

  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
