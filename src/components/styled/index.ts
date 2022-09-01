import styled from "styled-components";
import { defaultTheme } from "../../theme";

export const H1 = styled.h1`
  color: ${defaultTheme.palette.white};
  font-size: 40px;
  line-height: 45px;
  font-weight: 100;
`;

export const Button = styled.button`
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  width: 150px;
  height: 50px;
  position: relative;
  background: ${defaultTheme.palette.lightorange};
  color: ${defaultTheme.palette.white};
  border: 0px solid;
  cursor: pointer;
  :disabled {
    background-color: ${defaultTheme.palette.gray};
  }
`;
