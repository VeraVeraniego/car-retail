import styled, { css } from "styled-components";

import { defaultTheme } from "../../theme";

export const InputStyle = css`
  height: 32px;
  background-color: ${defaultTheme.palette.white};
  border: 1px solid ${defaultTheme.palette.gray};
  border-radius: 4px;
  color: ${defaultTheme.palette.darkblue};
  padding-left: 8px;
`;
export const CSSFlexCol = css`
  display: flex;
  flex-direction: column;
`;
export const CSSCenteredFlexCol = css`
  ${CSSFlexCol};
  align-items: center;
`;
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
export const H3 = styled.h3`
  color: ${defaultTheme.palette.darkblue};
  font-size: 18px;
  line-height: 20px;
  font-weight: 100;
`;
export const H4 = styled.h4`
  color: ${defaultTheme.palette.darkgray};
  font-size: 14px;
  line-height: 16px;
  font-weight: 100;
`;
export const P = styled.p`
  font-size: 14px;
  line-height: 16px;
  font-weight: 100;
`;
export const FlexRow = styled.div`
  display: flex;
`;
export const FlexColumn = styled(FlexRow)`
  flex-direction: column;
`;
export const Form = styled.form`
  background: ${defaultTheme.palette.darkblue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;
`;
export const Button = styled.button`
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  width: 120px;
  height: 30px;
  border-radius: 5px;
  letter-spacing: 0em;
  position: relative;
  background: ${defaultTheme.palette.lightorange};
  color: ${defaultTheme.palette.white};
  border: 0px solid;
  cursor: pointer;
  :disabled {
    background-color: ${defaultTheme.palette.gray};
  }
`;
export const ButtonOnHoverOppacity = styled(Button)`
  &:hover {
    opacity: 0.8;
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
export const ValidationText = styled.p`
  font-size: 16px;
  color: ${defaultTheme.palette.red};
  margin: 16px;
`;
