import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import NewReview from "../new-review/new-review.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import Preloader from "../preloader/preloader.jsx";
import MyList from "../my-list/my-list.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import withTabs from "../../hocs/with-tabs.js";
import withReview from "../../hocs/with-review.js";
import withFullScreenPlayer from "../../hocs/with-full-screen-player";

import {getLoadingMoviesState, getLoadingPromoMovieState} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import history from "../../history";
import {AppRoute, AuthorizationStatus} from "../../consts";


const MoviePageWrapped = withTabs(MoviePage);
const NewReviewWrapped = withReview(NewReview);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);


export const App = (props) => {
  const {isLoadingMovies, isLoadingPromoMovie, authorizationStatus} = props;

  if (isLoadingMovies || isLoadingPromoMovie) {
    return <Preloader />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <Route exact path={AppRoute.LOGIN} render={() => {
          return authorizationStatus === AuthorizationStatus.NO_AUTH ? <SignIn /> : <Main />;
        }}>
        </Route>
        <Route exact path={`${AppRoute.FILM}/:id`} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <MoviePageWrapped id={id} />;
        }}/>
        <Route exact path={`${AppRoute.PLAYER}/:id`} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <FullScreenPlayerWrapped id={id} />;
        }}/>
        <PrivateRoute exact path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <NewReviewWrapped id={id} />;
        }}/>
        <PrivateRoute exact path={AppRoute.MY_LIST} render={() => <MyList />} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  isLoadingMovies: PropTypes.bool.isRequired,
  isLoadingPromoMovie: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isLoadingMovies: getLoadingMoviesState(state),
  isLoadingPromoMovie: getLoadingPromoMovieState(state),
  authorizationStatus: getAuthorizationStatus(state)
});


export default connect(mapStateToProps)(App);
