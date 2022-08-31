import styled from "styled-components";
import { defaultTheme } from "../../theme";

export const Form = styled.form`
  width: 300;
  height: 100vh;
  padding-top: 33vh;
  background: ${defaultTheme.palette.green};
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: flex-start;
  align-items: center;
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
  color: #fff;
  margin-top: 16px;
`;
