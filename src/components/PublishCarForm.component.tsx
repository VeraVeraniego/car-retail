import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import {
  useCreateCarMutation,
  useFormDataQuery,
  useModelsLazyQuery,
} from "../graphql/generated/graphql";
import { modelsbyBrandIdVariables } from "../graphql/variables";
import { GlobalStyle, defaultTheme } from "../theme";
import { ConditionFieldset } from "./ConditionFieldset";
import { FormSelectInput } from "./FormSelectInput.component";
import {
  ButtonOnHoverOppacity,
  CSSFlexCol,
  FlexRow,
  Form,
  H2,
  H3,
  InputStyle,
  P,
  ValidationText,
} from "./styled";
import Loader from "./styled/Loader.component";

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
    { data: modelsData, error: modelsError, loading: modelsLoading },
  ] = useModelsLazyQuery();

  const [createCar, { data: mutationReturn, loading: mutationLoading }] =
    useCreateCarMutation();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const threeMonthsAhead = new Date();
  threeMonthsAhead.setDate(threeMonthsAhead.getDate() + 90);

  const brandId = watch("brand_id");
  const odometer = watch("odometer");
  const cityId = watch("city_id");

  const onSubmit: SubmitHandler<any> = async (data) => {
    const brand = formsData?.brands.find(
      (brand) => brand.id == getValues("brand_id")
    )?.name;
    const model = modelsData?.models.find(
      (model) => model.id == getValues("model_id")
    )?.name;
    data.title = `${brand} ${model} ${getValues("year")}`;
    for (const key in data)
      if (key.includes("id")) data[key] = parseInt(data[key]);

    try {
      await createCar({
        variables: { object: data },
        optimisticResponse: {
          insert_cars_one: data,
          __typename: "mutation_root",
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              cars(existingCars = []) {
                const newCar = data?.insert_cars_one;
                return existingCars.concat(newCar);
              },
            },
          });
        },
      });
      reset();
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
      {loading ? (
        <Loader />
      ) : dataError || modelsError ? (
        <ValidationText>
          Couldn&apos;t load data - Try again later
        </ValidationText>
      ) : (
        <>
          <Title>Brand *</Title>
          <Validation>{errors.brand_id?.message}</Validation>
          <FormSelectInput
            register={register("brand_id", {
              required: VALIDATION_MESSAGES.BRAND,
            })}
            onChange={(e) => {
              register("brand_id").onChange(e);
              setValue("model_id", undefined);
            }}
            label="Brand"
            loading={loading}
            data={formsData?.brands}
          />

          <Title>Model *</Title>
          <Validation>{errors.model_id?.message}</Validation>
          <FormSelectInput
            register={register("model_id", {
              required: VALIDATION_MESSAGES.MODEL,
            })}
            label="Model"
            loading={modelsLoading}
            disabled={!brandId}
            data={modelsData?.models}
          />

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

          <Title>Vehicle Identification Number *</Title>
          <Validation>{errors.vin?.message}</Validation>
          <Input
            {...register("vin", { required: VALIDATION_MESSAGES.VIN })}
            placeholder="8YTN4YPFK375ZNV"
          />

          <Title>Color *</Title>
          <Validation>{errors.color_id?.message}</Validation>
          <FormSelectInput
            register={register("color_id", {
              required: VALIDATION_MESSAGES.COLOR,
            })}
            label="Colors"
            loading={loading}
            data={formsData?.colors}
          />

          <Title>ODOmeter ({odometer ?? 10000} km) *</Title>
          <Input
            {...register("odometer")}
            type="range"
            min={0}
            max={250000}
            step={500}
            defaultValue={10000}
          />

          <ConditionFieldset
            error={errors.condition?.message}
            register={register}
            validation={VALIDATION_MESSAGES.CONDITION}
          />

          <Title>Sale Date</Title>
          <Validation>{errors.sale_date?.message}</Validation>
          <Input
            {...register("sale_date", {
              required: VALIDATION_MESSAGES.SALE_DATE,
            })}
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
          <PublishButton disabled={mutationLoading}>
            {mutationLoading ? "LOADING..." : "PUBLISH CAR NOW"}
          </PublishButton>
        </>
      )}
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

export const Title = styled(H3)`
  margin-top: 16px;
`;

export const Validation = styled(P)`
  margin-bottom: 4px;
  font-size: 10px;
  color: ${defaultTheme.palette.red};
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
