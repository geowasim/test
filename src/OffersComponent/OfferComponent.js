import React from "react";

const OfferComponent = (props) => {
  if (!props) {
    return;
  } else if (props.codeE === "25FO") {
    return (
      <div className="offer-component">
        <p>
          {" "}
          العروض : خصم 25% على عطر أورو وفيوري <span>*</span>
        </p>
      </div>
    );
  } else if (props.codeE === "25FO") {
    return (
      <div className="offer-component">
        <p>
          {" "}
          العروض : خصم 25% على عطر أورو وفيوري <span>*</span>
        </p>
      </div>
    );
  }
};

export default OfferComponent;
