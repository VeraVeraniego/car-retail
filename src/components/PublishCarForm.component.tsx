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
  useCreateCarMutation,
  useFormDataLazyQuery,
  useFormDataQuery,
  useModelsLazyQuery,
} from "../graphql/generated/graphql";
import {
  modelsbyBrandIdVariables,
  variableWrapper,
} from "../graphql/variables";
import { Condition } from "../utils/CarAdapter.util";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "../utils";
import { FormSelectInput } from "./FormSelectInput.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GraphQLError } from "graphql";

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
  const { data: formsData, error: dataError, loading } = useFormDataQuery();
  const [
    fetchModels,
    { data: modelsData, error: modelsError, loading: modelsLoading, refetch },
  ] = useModelsLazyQuery();
  //   {
  //   fetchPolicy: "network-only",
  // }

  const [
    createCar,
    { data: mutationReturn, error: mutationError, loading: mutationLoading },
  ] = useCreateCarMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  // const navigate = useNavigate();

  const threeMonthsAhead = new Date();
  threeMonthsAhead.setDate(threeMonthsAhead.getDate() + 90);

  const brandId = watch("brand_id");
  const odometer = watch("odometer");
  const cityId = watch("city_id");

  const onSubmit: SubmitHandler<any> = async (data) => {
    const color = formsData?.colors.find(
      (color) => color.id == getValues("color_id")
    )?.name;
    const brand = formsData?.brands.find(
      (brand) => brand.id == getValues("brand_id")
    )?.name;
    const model = modelsData?.models.find(
      (model) => model.id == getValues("model_id")
    )?.name;
    data.title = `${color} ${brand} ${model} ${getValues("year")}`;
    for (let key in data)
      if (key.includes("id")) data[key] = parseInt(data[key]);

    try {
      await createCar({ variables: { object: data } });
    } catch (e) {
      toast.error(
        "Car could not be published, you may have already added this car."
      );
      const err = e as Error;
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (brandId)
      fetchModels(variableWrapper(modelsbyBrandIdVariables(brandId)));
  }, [brandId]);

  useEffect(() => {
    if (!mutationReturn) return;
    toast.success("Successfully added car");
  }, [mutationReturn]);

  const setStateId = () => {
    const stateId = formsData?.states.find((state) =>
      state.cities.find((city) => city.id == cityId)
    )?.id;
    setValue("state_id", stateId);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <GlobalStyle />

      <H2>Publish a Car</H2>
      {dataError && <ValidationText>{dataError.message}</ValidationText>}

      {/* BRAND */}
      <Title>Brand *</Title>
      <Validation>{errors.brand_id?.message}</Validation>
      <FormSelectInput
        register={register("brand_id", { required: VALIDATION_MESSAGES.BRAND })}
        onChange={(e) => {
          register("brand_id").onChange(e);
          setValue("model_id", undefined);
        }}
        label="Brand"
        loading={loading}
        data={formsData?.brands}
      />

      {/* MODEL */}
      <Title>Model *</Title>
      <Validation>{errors.model_id?.message}</Validation>
      <FormSelectInput
        register={register("model_id", { required: VALIDATION_MESSAGES.MODEL })}
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
        defaultValue="2020"
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
        loading={loading}
        data={formsData?.states}
        onBlur={() => setStateId()}
      />

      {/* VIN */}
      <Title>Vehicle Identification Number *</Title>
      <Validation>{errors.vin?.message}</Validation>
      <Input
        {...register("vin", { required: VALIDATION_MESSAGES.VIN })}
        placeholder="8YTN4YPFK375ZNV"
      />

      {/* COLORS */}
      <Title>Color *</Title>
      <Validation>{errors.color_id?.message}</Validation>
      <FormSelectInput
        register={register("color_id", { required: VALIDATION_MESSAGES.COLOR })}
        label="Colors"
        loading={loading}
        data={formsData?.colors}
      />

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

      {/* Sale date */}
      <Title>Sale Date</Title>
      <Validation>{errors.sale_date?.message}</Validation>
      <Input
        {...register("sale_date", { required: VALIDATION_MESSAGES.SALE_DATE })}
        type="date"
        min={new Date().toISOString().split("T")[0]}
        max={threeMonthsAhead.toISOString().split("T")[0]}
      />

      {/* Price */}
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
      <ToastContainer />
      <PublishButton disabled={mutationLoading}>
        {mutationLoading ? "LOADING..." : "PUBLISH CAR NOW"}
      </PublishButton>
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
        {...register("color_id", { required: VALIDATION_MESSAGES.COLOR })}
        disabled={loading}
      >
        <option value="">{loading ? "Loading..." : "Select an option"}</option>
        {!loading &&
          formsData?.colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
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
