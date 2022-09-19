import styled from "styled-components";
import { ButtonOnHoverOppacity, FlexRow, H4 } from ".";
import { defaultTheme } from "../../theme";

export const FirstRow = styled(FlexRow)`
  margin-top: 16px;
  padding-top: 40px;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

export const HeadersRow = styled(FlexRow)`
  padding-left: 8px;
  margin-top: 24px;
  justify-content: flex-start;

  h4:first-of-type {
    max-width: 160px;
  }
`;
export const TableHead = styled(H4)`
  flex-grow: 1;
`;
export const Container = styled.section`
  background-color: ${defaultTheme.palette.bglightgray};
  padding-left: 24px;
  padding-right: 24px;
  min-height: calc(100vh - 93px);
  height: auto;
`;
export const PublishNewCarButton = styled(ButtonOnHoverOppacity)`
  background-color: ${defaultTheme.palette.blue};
  color: ${defaultTheme.palette.white};
`;
