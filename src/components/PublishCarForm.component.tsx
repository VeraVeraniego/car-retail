import React from "react";
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
import { usePublishDataQuery } from "../graphql/generated/graphql";

interface FormValues {
  brand_Id: number;
  model_Id: number | string;
  year_Id?: number;
  city_Id?: number;
  vin?: string;
  color_Id?: number;
}
export const PublishCarForm = () => {
  const { data, error, loading } = usePublishDataQuery();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<any> = (data) => console.log("submit", data);

  function getModelsByBrandId(brandId: number) {
    setValue("model_Id", "");
    const test = data?.brands.find((brand) => brand.id == brandId);
    return test?.models;
  }
  const TESTSELECT = <select></select>;
  console.log("watch", watch("brand_Id"));
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <GlobalStyle />
      {loading ? (
        <H2>Loading...</H2>
      ) : (
        <>
          <H2>Publish a Car</H2>
          <Title>Brand *</Title>
          <select {...register("brand_Id")} defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <optgroup label="Brands">
              {data?.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </optgroup>
          </select>
          <Title>Model *</Title>
          <select {...register("model_Id")} disabled={!getValues("brand_Id")}>
            <option>Select an option</option>
            <optgroup label="Model">
              {getModelsByBrandId(getValues("brand_Id"))?.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </optgroup>
          </select>
          <Title>Fabrication Year *</Title>
          {TESTSELECT}
          <Title>Origin City *</Title>
          {TESTSELECT}
          <Title>Vehicle Identification Number *</Title>
          <input />

          <Title>Color *</Title>
          {TESTSELECT}
          {/* input range below */}
          <Title>ODOmeter *</Title>
          <input type="range" />
          <Title>Condition *</Title>
          {TESTSELECT}
          <Title>Damage Type</Title>
          {TESTSELECT}
          {/* date picker below */}
          <Title>Sale Date</Title>
          {TESTSELECT}
          {/* dolar sign before next input */}
          <Title>Price willing to sell</Title>
          <input />
        </>
      )}
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
