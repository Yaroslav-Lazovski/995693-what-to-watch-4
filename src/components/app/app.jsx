import React from "react";
import Main from "../main/main.jsx";

import {MOVIE_TITLES} from "../../consts.js";


const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const App = () => {

  return (
    <Main
      promoTitle={promoInfo.title}
      promoGenre={promoInfo.genre}
      promoYear={promoInfo.year}
      movieTitles={MOVIE_TITLES}
      onTitleClick={() => {}}
    />
  );
};


export default App;
