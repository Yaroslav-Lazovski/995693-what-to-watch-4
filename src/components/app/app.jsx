import React from "react";
import Main from "../main/main.jsx";

import films from "../../mocks/films.js";


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
      movies={films}
      onTitleClick={() => {}}
    />
  );
};


export default App;
