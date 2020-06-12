import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

ReactDOM.render(
    <App
      promoTitle={promoInfo.title}
      promoGenre={promoInfo.genre}
      promoYear={promoInfo.year}
    />,
    document.querySelector(`#root`)
);
