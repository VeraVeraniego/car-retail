import React, { useEffect } from "react";
import styled from "styled-components";
import { Cars, useCarsQuery } from "../../graphql/generated/graphql";
import { CarRowInfo, CarsState } from "../../interfaces/Car";
import { CAR_SKELETON_PROPS, IMG_URL } from "../../utils/constants";
import { FlexColumn, H2, ValidationText } from "../styled";
import { CarInfo } from "./CarInfo.component";

export const CarContainer = ({ carsState }: CarsState) => {
  const [cars, setCars] = carsState;
  const { data, error, loading } = useCarsQuery();

  useEffect(() => {
    if (!data) return;
    const adaptedCars = data.cars.map((elem, index) =>
      responseCarToCarComponent(elem as Cars)
    );
    setCars(adaptedCars);
  }, [data]);

  function responseCarToCarComponent(queryCar: Cars) {
    const shapedCar: CarRowInfo = {
      id: queryCar.id,
      title: `${queryCar.model.brand.name} ${queryCar.model.name} ${queryCar.year}`,
      batch: queryCar.batch,
      vin: queryCar.vin,
      odo: queryCar.odometer ? queryCar.odometer : "",
      price: queryCar.price,
      condition:
        queryCar.condition === "A"
          ? "Salvage Title"
          : queryCar.condition === "N"
          ? "New"
          : "Other",
      damageType: queryCar.damage_type ? queryCar.damage_type : "",
      saleDate: queryCar.sale_date,
      place: `${queryCar.city.name}-${queryCar.city.state.name}`,
    };
    return shapedCar;
  }

  return (
    <Container>
      {loading ? (
        <>
          <CarInfo {...CAR_SKELETON_PROPS} />
          <CarInfo {...CAR_SKELETON_PROPS} />
          <CarInfo {...CAR_SKELETON_PROPS} />
          {/* <CarInfo {...CAR_SKELETON_PROPS} /> */}
        </>
      ) : error ? (
        <ValidationText>
          Error {error.message ? "- " + error.message : "- Unknown"}
        </ValidationText>
      ) : (
        cars?.map((ele, ind) => (
          <CarInfo
            key={ele.vin}
            img={`${IMG_URL}/10${ele.id}/300/200`}
            title={ele.title}
            batch={ele.batch}
            odo={ele.odo}
            price={ele.price}
            condition={ele.condition}
            damageType={ele.damageType}
            saleDate={ele.saleDate}
            place={ele.place}
          />
        ))
      )}
      {/* <CarInfo />
      <CarInfo />
      <CarInfo />
      <CarInfo /> */}
    </Container>
  );
};

const Container = styled(FlexColumn)`
  margin-top: 8px;
  padding-bottom: 8px;
  gap: 28px;
`;
