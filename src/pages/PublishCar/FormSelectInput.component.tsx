import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

import { InputStyle } from "../../components/styled";
import { defaultTheme } from "../../theme";

type MapElement = { id: number; name: string };
interface State extends MapElement {
  cities: Array<MapElement>;
}
interface Props {
  label: string;
  register: UseFormRegisterReturn;
  loading: boolean;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onChange?: (e: React.ChangeEvent) => void;
  data?: Array<any>;
  disabled?: boolean;
}
export const FormSelectInput = ({
  label,
  register,
  onFocus,
  onBlur,
  onChange,
  loading,
  data,
  disabled,
}: Props) => {
  let selectBody: React.ReactElement;

  if (loading) selectBody = <option value="">Loading..</option>;

  if (label === "Cities")
    selectBody = (
      <>
        <option value="">{"Select an option"}</option>
        {data?.map((state: State) => (
          <optgroup key={state.id} label={state.name}>
            {state.cities.map((city: MapElement) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </optgroup>
        ))}
      </>
    );
  else
    selectBody = (
      <>
        <option value="">{loading ? "Loading..." : "Select an option"}</option>
        <optgroup label={label}>
          {data?.map((ele: MapElement) => (
            <option key={ele.id} value={ele.id}>
              {ele.name}
            </option>
          ))}
        </optgroup>
      </>
    );

  return (
    <Select
      {...register}
      onFocus={onFocus}
      onChange={onChange ? onChange : register.onChange}
      disabled={disabled}
      defaultValue=""
      onBlur={onBlur ? onBlur : register.onBlur}
    >
      {selectBody}
    </Select>
  );
};

const Select = styled.select`
  ${InputStyle}
  &:disabled {
    color: ${defaultTheme.palette.inactive};
  }
`;
