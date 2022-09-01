import styled from "styled-components";
import { defaultTheme } from "../theme";

export const H1 = styled.h1`
  color: ${defaultTheme.palette.white};
  font-size: 40px;
  line-height: 45px;
  font-weight: 100;
`;
export const H2 = styled.h2`
  color: ${defaultTheme.palette.darkblue};
  font-size: 25px;
  line-height: 30px;
  font-weight: 100;
`;
export const Form = styled.form`
  background: ${defaultTheme.palette.darkblue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;
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
export const Input = styled.input`
  border: 0px solid;
  background-color: #fff;
`;
export const NavButton = styled(Button)`
  margin-top: 8px;
  align-self: flex-start;
  color: ${defaultTheme.palette.darkblue};
  width: auto;
  height: auto;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    color: ${defaultTheme.palette.white};
    background-color: ${defaultTheme.palette.orange};
  }
`;
