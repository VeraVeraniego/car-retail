import React from "react";
import styled from "styled-components";
import { InputStyle } from "../../components/styled";
import { defaultTheme } from "../../theme";


type MapElement = { id: number; name: string };
interface State extends MapElement {
  cities: Array<MapElement>;
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
}: {
  label: string;
  register: any;
  onFocus?: any;
  onBlur?: any;
  onChange?: (e: React.ChangeEvent) => void;
  loading: boolean;
  data: any;
  disabled?: boolean;
}) => {
  return (
    <Select
      {...register}
      onFocus={onFocus}
      onChange={onChange ? onChange : register.onChange}
      disabled={disabled}
      defaultValue=""
      onBlur={onBlur ? onBlur : register.onBlur}
    >
      <option value="">{loading ? "Loading..." : "Select an option"}</option>
      {label === "Cities" ? (
        !loading &&
        data?.map((state: State) => (
          <optgroup key={state.id} label={state.name}>
            {state.cities.map((city: MapElement) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </optgroup>
        ))
      ) : (
        <optgroup label={label}>
          {!loading &&
            data?.map((ele: MapElement) => (
              <option key={ele.id} value={ele.id}>
                {ele.name}
              </option>
            ))}
        </optgroup>
      )}
    </Select>
  );
};

const Select = styled.select`
  ${InputStyle}
  &:disabled {
    color: ${defaultTheme.palette.inactive};
  }
`;
