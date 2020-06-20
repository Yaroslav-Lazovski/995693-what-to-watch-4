import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

import films from "../../mocks/films.js";


const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            promoTitle={promoInfo.title}
            promoGenre={promoInfo.genre}
            promoYear={promoInfo.year}
            movies={films}
            onTitleClick={() => {}}
          />
        </Route>
        <Route exact path="/dev-film">
          <MoviePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};


export default App;
