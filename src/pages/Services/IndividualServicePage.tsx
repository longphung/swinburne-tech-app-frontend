import React from "react";
import { useParams } from "react-router-dom";

const IndividualServicePage = () => {
  const { id } = useParams();

  return <div>IndividualService: {id}</div>;
};

export default IndividualServicePage;
