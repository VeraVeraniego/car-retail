import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { defaultTheme, GlobalStyle } from "../theme";
import {
  Button,
  CSSCenteredFlexCol,
  CSSFlexCol,
  Form,
  H1,
  H2,
  H3,
  H4,
} from "./styled";
import { useForm, SubmitHandler } from "react-hook-form";

import { FetchPolicy, gql, WatchQueryFetchPolicy } from "@apollo/client";
import {
  useBrandsLazyQuery,
  useCitiesLazyQuery,
  useColorsLazyQuery,
  useModelsLazyQuery,
  useStatesLazyQuery,
} from "../graphql/generated/graphql";
import { modelsbyBrandIdVariables } from "../graphql/variables";
import { Condition } from "../utils/CarAdapter.util";

interface FormValues {
  brand_Id: number;
  model_Id: number | string;
  year?: number;
  state_Id?: number | string;
  city_Id?: number;
  vin?: string;
  color_Id?: number;
  odo: number | string;
  condition: string;
  damageType: string;
  saleDate: string;
  price: number;
}

export const PublishCarForm = () => {
  const networkFetch: { fetchPolicy: WatchQueryFetchPolicy | undefined } = {
    fetchPolicy: "network-only",
  };
  const [
    fetchBrands,
    { data: brandsData, error: brandsError, loading: brandsLoading },
  ] = useBrandsLazyQuery(networkFetch);
  const [
    fetchModels,
    { data: modelsData, error: modelsError, loading: modelsLoading },
  ] = useModelsLazyQuery(networkFetch);
  const [
    fetchStates,
    { data: statesData, error: statesError, loading: statesLoading },
  ] = useStatesLazyQuery(networkFetch);
  const [
    fetchColors,
    { data: colorData, error: colorError, loading: colorLoading },
  ] = useColorsLazyQuery(networkFetch);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const today = new Date();
  const aYearAway = new Date();
  aYearAway.setDate(aYearAway.getDate() + 365);
  console.log(aYearAway);

  const onSubmit: SubmitHandler<any> = (data) => console.log("submit", data);

  // useEffect(() => {
  //   console.log("data", colorData);
  // }, [statesData]);

  // useEffect(() => {
  //   console.log("loading", loading);
  // }, [loading]);

  // function getModelsByBrandId(brandId: number) {
  //   setValue("model_Id", "");
  //   const test = data?.brands.find((brand) => brand.id == brandId);
  //   return test?.models;
  // }

  const TESTSELECT = <select></select>;
  // console.log("brandIs:", watch("brand_Id"));
  // console.log("ODOIs:", watch("odo"));
  const brandId = watch("brand_Id");
  const odo = watch("odo");
  const cityId = watch("city_Id");

  const setStateId = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("changed city and so state");

    // register("city_Id").onChange(e);
    // console.log("watch city id on setstate", cityId);
    const stateId = statesData?.states
      .find((state) => state.cities.find((city) => city.id == cityId))
      ?.id.toString();
    // console.log("state to set", stateId);
    setValue("state_Id", stateId);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <GlobalStyle />

      <H2>Publish a Car</H2>
      {/* BRAND */}
      <Title>Brand *</Title>
      <select
        {...register("brand_Id")}
        defaultValue=""
        disabled={brandsLoading}
        onFocus={() => fetchBrands()}
      >
        <option value="">Select an option</option>
        <optgroup label="Brands">
          {brandsLoading ? (
            <option>Loading...</option>
          ) : (
            brandsData?.brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))
          )}
        </optgroup>
      </select>
      {/* MODEL */}
      <Title>Model *</Title>
      <select
        {...register("model_Id")}
        disabled={!brandId}
        defaultValue=""
        onFocus={() => {
          fetchModels({
            variables: modelsbyBrandIdVariables(brandId),
          });
        }}
      >
        <option value="">Select an option</option>
        <optgroup label="Model">
          {modelsLoading ? (
            <option>Loading...</option>
          ) : (
            modelsData?.models?.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))
          )}
        </optgroup>
      </select>
      {/* YEAR */}
      <Title>Fabrication Year *</Title>
      <input
        type="number"
        min="1950"
        max="2023"
        step="1"
        defaultValue={2020}
        {...register("year")}
      />
      {/* CITIES */}
      <Title>Origin City *</Title>
      <select
        {...register("city_Id")}
        disabled={statesLoading}
        onFocus={() => fetchStates()}
        onBlur={(e) => setStateId(e)}
      >
        <option value="">Select an option</option>
        {statesLoading ? (
          <option>Loading...</option>
        ) : (
          statesData?.states.map((state) => (
            <optgroup key={state.id} label={state.name}>
              {state.cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </optgroup>
          ))
        )}
      </select>
      <Title>Vehicle Identification Number *</Title>
      <input />
      {/* COLORS */}
      <Title>Color *</Title>
      <select
        {...register("color_Id")}
        disabled={colorLoading}
        onFocus={() => fetchColors()}
      >
        <option value="">Select an option</option>
        {colorLoading ? (
          <option>Loading...</option>
        ) : (
          colorData?.colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))
        )}
      </select>
      {/* ODOMETER */}
      <Title>ODOmeter ({odo ?? 10000} km) *</Title>
      <input
        {...register("odo")}
        type="range"
        min={0}
        max={250000}
        step={500}
        defaultValue={10000}
      />
      <Title>Condition *</Title>
      <input type="radio" name={Condition.A} />
      <input type="radio" name={Condition.N} />
      {/* <Title>Damage Type</Title>
      <select {...register("damageType")} defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        <option>No Damage</option>
        <option>Rear Damage</option>
        <option>Back Damage</option>
        <option>Minor Scratches</option>
      </select> */}
      {/* date picker below */}
      <Title>Sale Date</Title>
      <input type="date" min="2022-09-08" max="2023-09-08"></input>
      {/* dolar sign before next input */}
      <Title>Price willing to sell</Title>
      <input {...register("price")} type="number" />

      <Button>PUBLISH CAR NOW</Button>
    </Container>
  );
};
const Title = styled(H3)`
  margin-top: 8px;
`;
const Container = styled(Form)`
  ${CSSFlexCol};
  margin-top: 16mm mpx;
  padding: 16px;
  background-color: ${defaultTheme.palette.bglightgray};
  height: 100%;
  width: 80vw;
`;
