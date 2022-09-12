import React, { useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { defaultTheme, GlobalStyle } from "../theme";
import {
  ButtonOnHoverOppacity,
  CSSFlexCol,
  FlexRow,
  Form,
  H1,
  H2,
  H3,
  H4,
  InputStyle,
  P,
  ValidationText,
} from "./styled";
import { useForm, SubmitHandler } from "react-hook-form";

import { WatchQueryFetchPolicy } from "@apollo/client";
import {
  useBrandsLazyQuery,
  useColorsLazyQuery,
  useCreateCarMutation,
  useModelsLazyQuery,
  useStatesLazyQuery,
} from "../graphql/generated/graphql";
import {
  modelsbyBrandIdVariables,
  variableWrapper,
} from "../graphql/variables";
import { Condition } from "../utils/CarAdapter.util";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "../utils";
import { FormSelectInput } from "./FormSelectInput.component";

interface FormValues {
  brand_id: number;
  model_id?: number;
  year?: number;
  state_id?: number;
  city_id?: number;
  vin?: string;
  color_id?: number;
  odometer: number;
  condition: string;
  sale_date: string;
  price: number;
  title?: string;
}
const VALIDATION_MESSAGES = {
  BRAND: "Select your car's Brand",
  MODEL: "Select your car's Model",
  YEAR: "Enter your car's fabrication year",
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
  const [
    createCar,
    { data: mutationReturn, error: mutationError, loading: mutationLoading },
  ] = useCreateCarMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const threeMonthsAhead = new Date();
  threeMonthsAhead.setDate(threeMonthsAhead.getDate() + 90);

  const brandId = watch("brand_id");
  const modelId = watch("model_id");
  const colorId = watch("color_id");
  const odometer = watch("odometer");
  const cityId = watch("city_id");
  const year = watch("year");

  const error = brandsError ? (
    <ValidationText>"On brands:"+{brandsError.message}</ValidationText>
  ) : modelsError ? (
    <ValidationText>"On models:"+{modelsError.message}</ValidationText>
  ) : statesError ? (
    <ValidationText>"On states:"+{statesError.message}</ValidationText>
  ) : colorError ? (
    <ValidationText>"On colors:"+{colorError.message}</ValidationText>
  ) : (
    ""
  );

  const onSubmit: SubmitHandler<any> = (data) => {
    const color = colorData?.colors.find((color) => color.id == colorId)?.name;
    const brand = brandsData?.brands.find((brand) => brand.id == brandId)?.name;
    const model = modelsData?.models.find((model) => model.id == modelId)?.name;
    data.title = `${color} ${brand} ${model} ${year}`;
    for (let key in data)
      if (key.includes("id")) data[key] = parseInt(data[key]);
    createCar({ variables: { object: data } });
  };

  useEffect(() => {
    if (!mutationReturn) return;
    navigate(PATHNAME.RETAIL_CARS);
    console.log("mutation returned sth", mutationReturn);
  }, [mutationReturn]);

  const setStateId = () => {
    const stateId = statesData?.states.find((state) =>
      state.cities.find((city) => city.id == cityId)
    )?.id;
    setValue("state_id", stateId);
  };
  console.log("watch", watch());

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <GlobalStyle />

      <H2>Publish a Car</H2>
      {error}
      {/* BRAND */}
      <Title>Brand *</Title>
      <Validation>{errors.brand_id?.message}</Validation>
      <FormSelectInput
        register={register("brand_id", { required: VALIDATION_MESSAGES.BRAND })}
        onFocus={() => fetchBrands()}
        onChange={(e) => {
          register("brand_id").onChange(e);
          setValue("model_id", undefined);
        }}
        label="Brand"
        loading={brandsLoading}
        data={brandsData?.brands}
      />

      {/* MODEL */}
      <Title>Model *</Title>
      <Validation>{errors.model_id?.message}</Validation>
      <FormSelectInput
        register={register("model_id", { required: VALIDATION_MESSAGES.MODEL })}
        onFocus={() =>
          fetchModels(variableWrapper(modelsbyBrandIdVariables(brandId)))
        }
        label="Model"
        loading={modelsLoading}
        disabled={!brandId}
        data={modelsData?.models}
      />
      {/* YEAR */}
      <Title>Fabrication Year *</Title>
      <Validation>{errors.year?.message}</Validation>
      <Input
        {...register("year", {
          required: VALIDATION_MESSAGES.YEAR,
        })}
        type="number"
        min="1950"
        max="2023"
        step="1"
        placeholder="2020"
      />
      {/* CITIES */}
      <Title>Origin City *</Title>
      <Validation>{errors.city_id?.message}</Validation>
      <FormSelectInput
        label="Cities"
        register={register("city_id", {
          required: VALIDATION_MESSAGES.CITY,
        })}
        loading={statesLoading}
        data={statesData?.states}
        onFocus={() => fetchStates()}
        onBlur={() => setStateId()}
      />

      <Title>Vehicle Identification Number *</Title>
      <Validation>{errors.vin?.message}</Validation>

      <Input
        {...register("vin", { required: VALIDATION_MESSAGES.VIN })}
        placeholder="8YTN4YPFK375ZNV"
      />
      {/* COLORS */}
      <Title>Color *</Title>
      <Validation>{errors.color_id?.message}</Validation>
      <Select
        {...register("color_id", { required: VALIDATION_MESSAGES.COLOR })}
        disabled={colorLoading}
        onFocus={() => fetchColors()}
      >
        <option value="">
          {colorLoading ? "Loading..." : "Select an option"}
        </option>
        {!colorLoading &&
          colorData?.colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
      </Select>
      {/* ODOMETER */}
      <Title>ODOmeter ({odometer ?? 10000} km) *</Title>
      <Input
        {...register("odometer")}
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
          <Validation>{errors.condition?.message}</Validation>
        </legend>
        <RadioInput
          {...register("condition", {
            required: VALIDATION_MESSAGES.CONDITION,
          })}
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

      <Title>Sale Date</Title>
      <Validation>{errors.sale_date?.message}</Validation>
      <Input
        {...register("sale_date", { required: VALIDATION_MESSAGES.SALE_DATE })}
        type="date"
        min={new Date().toISOString().split("T")[0]}
        max={threeMonthsAhead.toISOString().split("T")[0]}
      />

      <Title>Price willing to sell</Title>
      <Validation>{errors.price?.message}</Validation>
      <PriceContainer>
        <P>$</P>
        <PriceInput
          {...register("price", { required: VALIDATION_MESSAGES.PRICE })}
          type="number"
          min={3000}
          max={1000000}
          placeholder="10500"
        />
      </PriceContainer>
      <ValidationText>
        {mutationError && "Couldn't create car: " + mutationError?.message}
      </ValidationText>
      <PublishButton>PUBLISH CAR NOW</PublishButton>
    </Container>
  );
};
const Container = styled(Form)`
  ${CSSFlexCol};
  margin-top: 16px;
  padding: 16px;
  background-color: ${defaultTheme.palette.bglightgray};
  height: 100%;
  width: 80vw;
`;
const Title = styled(H3)`
  margin-top: 16px;
`;
const Validation = styled(P)`
  margin-bottom: 4px;
  font-size: 10px;
  color: ${defaultTheme.palette.red};
`;

const Select = styled.select`
  ${InputStyle}
  &:disabled {
    color: ${defaultTheme.palette.inactive};
  }
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
  background-color: ${defaultTheme.palette.white};
`;
const RadioInput = styled.input`
  margin-left: 8px;
`;

/* <Title>Damage Type</Title>
      <Select {...register("damageType")} defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        <option>No Damage</option>
        <option>Rear Damage</option>
        <option>Back Damage</option>
        <option>Minor Scratches</option>
      </Select> */

/* <Select
        // {...register("brand_id")}
        {...register("brand_id", { required: VALIDATION_MESSAGES.BRAND })}
        defaultValue=""
        onFocus={() => fetchBrands()}
        onChange={(e) => {
          register("brand_id").onChange(e);
          setValue("model_id", undefined);
        }}
      >
        <option value="">
          {brandsLoading ? "Loading..." : "Select an option"}
        </option>
        <optgroup label="Brands">
          {!brandsLoading &&
            brandsData?.brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
        </optgroup>
      </Select> */

/* <Select
        {...register("model_id", { required: VALIDATION_MESSAGES.MODEL })}
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
          {!modelsLoading &&
            modelsData?.models?.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
        </optgroup>
      </Select> */

/* <Select
        {...register("city_id", { required: VALIDATION_MESSAGES.CITY })}
        onFocus={() => fetchStates()}
        onBlur={() => setStateId()}
      >
        <option value="">
          {statesLoading ? "Loading..." : "Select an option"}
        </option>
        {!statesLoading &&
          statesData?.states.map((state) => (
            <optgroup key={state.id} label={state.name}>
              {state.cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </optgroup>
          ))}
      </Select> */
