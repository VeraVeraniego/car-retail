import React, { useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { defaultTheme, GlobalStyle } from "../theme";
import {
  Button,
  ButtonOnHoverOppacity,
  CSSCenteredFlexCol,
  CSSFlexCol,
  FlexRow,
  Form,
  H1,
  H2,
  H3,
  H4,
  P,
} from "./styled";
import { useForm, SubmitHandler } from "react-hook-form";

import { WatchQueryFetchPolicy } from "@apollo/client";
import {
  useBrandsLazyQuery,
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
const VALIDATION_MESSAGES = {
  BRAND: "Select your car's Brand",
  MODEL: "Select your car's Model",
  YEAR: "Enter your car's fabrication year (between 1950 and 2023)",
  CITY: "Select your car's city of procedence",
  VIN: "Enter your Vehicle's Vehicle Identification Number",
  COLOR: "Select your car's color",
  CONDITION: "Pick your car's condition",
  SALE_DATE: "Select when you want to sell your car",
  PRICE: "Enter a price for your car",
};
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
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const aYearAway = new Date();
  aYearAway.setDate(aYearAway.getDate() + 90);

  const onSubmit: SubmitHandler<any> = (data) => console.log("submit", data);

  // useEffect(() => {
  //   console.log("data", colorData);
  // }, [statesData]);

  const brandId = watch("brand_Id");
  const odo = watch("odo");
  const cityId = watch("city_Id");

  const setStateId = () => {
    const stateId = statesData?.states
      .find((state) => state.cities.find((city) => city.id == cityId))
      ?.id.toString();
    setValue("state_Id", stateId);
  };
  // TODO: CHANGE TITLES TO LABELS WITH HTMLFOR
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <GlobalStyle />

      <H2>Publish a Car</H2>
      {/* BRAND */}
      <p>{errors.brand_Id?.message}</p>
      <p>{errors.year?.message}</p>
      <p>{errors.price?.message}</p>
      <Title>Brand *</Title>
      <Select
        {...register("brand_Id")}
        // {...register("brand_Id", { required: "Select a Brand" })}

        defaultValue=""
        onFocus={() => fetchBrands()}
        onChange={(e) => {
          register("city_Id").onChange(e);
          setValue("model_Id", "");
        }}
      >
        <option value="">
          {brandsLoading ? "Loading..." : "Select an option"}
        </option>
        <optgroup label="Brands">
          {brandsData?.brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </optgroup>
      </Select>
      {/* MODEL */}
      <Title>Model *</Title>
      <Select
        {...register("model_Id")}
        // {...register("model_Id", { required: "Select a Model" })}

        disabled={!brandId}
        defaultValue=""
        onFocus={() => {
          fetchModels({
            variables: modelsbyBrandIdVariables(brandId),
          });
        }}
      >
        <option value="">
          {modelsLoading ? "Loading..." : "Select an option"}
        </option>
        <optgroup label="Model">
          {modelsData?.models?.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </optgroup>
      </Select>
      {/* YEAR */}
      <Title>Fabrication Year *</Title>
      <Input
        type="number"
        min="1950"
        max="2023"
        step="1"
        placeholder="2020"
        {...register("year", {
          required: VALIDATION_MESSAGES.YEAR,
        })}
      />
      {/* CITIES */}
      <Title>Origin City *</Title>
      <Select
        {...register("city_Id")}
        onFocus={() => fetchStates()}
        onBlur={() => setStateId()}
      >
        <option value="">
          {statesLoading ? "Loading..." : "Select an option"}
        </option>
        {statesData?.states.map((state) => (
          <optgroup key={state.id} label={state.name}>
            {state.cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
      <Title>Vehicle Identification Number *</Title>
      <Input {...register("vin")} placeholder="8YTN4YPFK375ZNV" />
      {/* COLORS */}
      <Title>Color *</Title>
      <Select
        {...register("color_Id")}
        disabled={colorLoading}
        onFocus={() => fetchColors()}
      >
        <option value="">
          {colorLoading ? "Loading..." : "Select an option"}
        </option>
        {colorData?.colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </Select>
      {/* ODOMETER */}
      <Title>ODOmeter ({odo ?? 10000} km) *</Title>
      <Input
        {...register("odo")}
        type="range"
        min={0}
        max={250000}
        step={500}
        defaultValue={10000}
      />
      {/* Condition */}
      <Fieldset>
        <legend>
          <Title>Condition *</Title>
        </legend>
        <RadioInput
          {...register("condition")}
          type="radio"
          value="A"
          name="condition"
          id={Condition.A}
        />
        <label htmlFor={Condition.A}>{Condition.A}</label>
        <RadioInput
          {...register("condition")}
          type="radio"
          value="N"
          name="condition"
          id={Condition.N}
        />
        <label htmlFor={Condition.N}>{Condition.N}</label>
      </Fieldset>
      {/* <Title>Damage Type</Title>
      <Select {...register("damageType")} defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        <option>No Damage</option>
        <option>Rear Damage</option>
        <option>Back Damage</option>
        <option>Minor Scratches</option>
      </Select> */}
      {/* date picker below */}
      <Title>Sale Date</Title>
      <Input
        {...register("saleDate")}
        type="date"
        min={new Date().toISOString().split("T")[0]}
        max={aYearAway.toISOString().split("T")[0]}
      />
      {/* dolar sign before next Input */}
      <Title>Price willing to sell</Title>
      <PriceContainer>
        <P>$</P>
        <PriceInput
          {...register("price", { min: 10000 })}
          type="number"
          min={3000}
          max={1000000}
          placeholder="10500"
        />
      </PriceContainer>

      <PublishButton>PUBLISH CAR NOW</PublishButton>
    </Container>
  );
};
const Title = styled(H3)`
  margin-top: 16px;
  margin-bottom: 4px;
`;
const Container = styled(Form)`
  ${CSSFlexCol};
  margin-top: 16px;
  padding: 16px;
  background-color: ${defaultTheme.palette.bglightgray};
  height: 100%;
  width: 80vw;
`;
const InputStyle = css`
  height: 32px;
  background-color: ${defaultTheme.palette.white};
  border: 1px solid ${defaultTheme.palette.gray};
  border-radius: 4px;
  color: ${defaultTheme.palette.darkblue};
  padding-left: 8px;
`;

const Select = styled.select`
  ${InputStyle}
`;
const Input = styled.input`
  ${InputStyle}
`;
const PriceContainer = styled(FlexRow)`
  ${InputStyle}
  align-items: center;
`;
const PriceInput = styled.input`
  margin-left: 8px;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
`;
const PublishButton = styled(ButtonOnHoverOppacity)`
  align-self: center;
  margin-top: 16px;
`;
const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-bottom: 8px;
`;
const RadioInput = styled.input`
  margin-left: 8px;
`;
