import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {onShowMoreButtonClick} = props;

  return (
    <div className="catalog__more">
      <button onClick={onShowMoreButtonClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};


export default ShowMore;
