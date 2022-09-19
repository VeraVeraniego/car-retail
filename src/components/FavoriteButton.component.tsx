import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styled from "styled-components";
import { defaultTheme } from "../theme";
import { Button } from "./styled";
interface Props {
  fav: boolean;
  onClick: () => void;
  loading: boolean;
}
export const FavoriteButton = ({ fav, onClick, loading }: Props) => {
  return (
    <FavButton fav={fav} disabled={loading} onClick={() => onClick()}>
      {loading ? (
        "Loading..."
      ) : !fav ? (
        <>
          <WatchIcon />
          Watch
        </>
      ) : (
        <>
          <UnwatchIcon />
          Unwatch
        </>
      )}
    </FavButton>
  );
};

const WatchIcon = styled(AiOutlineEye)`
  font-size: 16px;
`;
const UnwatchIcon = styled(AiOutlineEyeInvisible)`
  font-size: 16px;
`;
const FavButton = styled(Button)<{ fav?: boolean }>`
  line-height: 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 2px;
  border: 1px solid;
  background-color: inherit;
  color: ${(props) =>
    props.fav ? defaultTheme.palette.red : defaultTheme.palette.blue};
  width: 80px;
  &:hover {
    background-color: ${defaultTheme.palette.hr};
  }
  &:disabled {
    background-color: ${defaultTheme.palette.inactive};
    border-color: ${defaultTheme.palette.darkgray};
    color: ${defaultTheme.palette.dialog};
    cursor: unset;
  }
`;
