import React, { useState } from "react";
import { useOrderedCarsLazyQuery } from "../graphql/generated/graphql";

export const useHandleCars = () => {
  const [getCars, { data, error, loading }] = useOrderedCarsLazyQuery();

  const [cars, setCars] = useState(data);

  return { cars };
};
