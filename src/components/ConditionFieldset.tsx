import React from "react";
import styled from "styled-components";

import { defaultTheme } from "../theme";
import { Condition } from "../utils/CarAdapter.util";
import { Title, Validation } from "./PublishCarForm.component";

export const ConditionFieldset = ({ error, register, validation }: any) => {
  return (
    <RadioContainer>
      <legend>
        <Title>Condition *</Title>
        <Validation>{error}</Validation>
      </legend>
      <RadioInput
        {...register("condition", {
          required: validation,
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
    </RadioContainer>
  );
};
const RadioContainer = styled.fieldset`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-bottom: 8px;
  background-color: ${defaultTheme.palette.white};
`;
const RadioInput = styled.input`
  margin-left: 8px;
`;
