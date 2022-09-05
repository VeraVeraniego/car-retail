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
import { useBrandsQuery } from "../generated/graphql";

export const PublishCarForm = () => {
  const {
    data: brandsData,
    error: errorData,
    loading: loadingData,
  } = useBrandsQuery();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const TESTSELECT = (
    <select>
      <option disabled value="">
        Select an option
      </option>
      <option value="Toyota">Toyota</option>
      <option value="Jeep">Jeep</option>
    </select>
  );
  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Container>
      <GlobalStyle />
      <H2>Publish a Car</H2>
      <Title>Brand *</Title>
      {TESTSELECT}
      <Title>Model *</Title>
      {TESTSELECT}
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
