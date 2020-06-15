import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const titleClickHandler = () => {};

const App = (props) => {
  const {promoTitle, promoGenre, promoYear, movieTitles} = props;

  return (
    <Main
      promoTitle={promoTitle}
      promoGenre={promoGenre}
      promoYear={promoYear}
      movieTitles={movieTitles}
      onTitleClick={titleClickHandler}
    />
  );
};

App.propTypes = {
  promoTitle: PropTypes.string.isRequired,
  promoGenre: PropTypes.string.isRequired,
  promoYear: PropTypes.number.isRequired,
  movieTitles: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
};

export default App;
