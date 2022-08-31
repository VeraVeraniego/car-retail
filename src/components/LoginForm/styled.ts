import styled from "styled-components";
import { defaultTheme } from "../../theme";
import { H1 } from "../styled";

export const LoginH1 = styled(H1)`
  padding-top: 32px;
`;

export const Form = styled.form`
  width: 700px;
  height: 450px;
  /* padding-top: 100px; */
  background: ${defaultTheme.palette.darkblue};
  display: flex;
  flex-direction: column;
  gap: 56px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
`;
export const Title = styled.h1`
  width: 203px;
  height: 48px;
  color: #fff;
  font-style: normal;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
`;
export const Input = styled.input`
  width: 530px;
  border: 0px solid;
  height: 90px;
  background-color: #fff;
  padding-left: 22px;
`;
export const ButtonAndValidation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LoginButton = styled.button`
  position: relative;
  font-size: 24px;
  line-height: 29px;
  width: 530px;
  height: 90px;
  background: ${defaultTheme.palette.lightorange};
  color: #fff;
  border: 0px solid;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  line-height: 29px;
  cursor: pointer;
  :disabled {
    background-color: ${defaultTheme.palette.gray};
  }
`;
export const ValidationText = styled.p`
  font-size: 16px;
  color: ${defaultTheme.palette.red};
  margin-top: 16px;
`;
