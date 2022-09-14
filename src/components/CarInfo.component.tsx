import React, { useContext, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../theme";
import { Button, FlexColumn, FlexRow, H3, H4, P } from "./styled";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CarRowInfo } from "../interfaces/Car";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "../utils";
import { CREATE_USER_CAR, DELETE_USER_CAR } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCarVariables, variableWrapper } from "../graphql/variables";
import { FavoriteButton } from "./FavoriteButton.component";

export const CarInfo = ({
  id,
  isFavorite: isFav,
  img,
  title,
  batch,
  odo,
  price,
  condition,
  damageType,
  saleDate,
  place,
}: CarRowInfo) => {
  const { loggedUser } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(isFav ?? false);
  const [
    createUserCar,
    { data: favData, error: favError, loading: favLoading },
  ] = useMutation(CREATE_USER_CAR);
  const [
    deleteUserCar,
    { data: unfavData, error: unfavError, loading: unfavLoading },
  ] = useMutation(DELETE_USER_CAR);
  const now = new Date();
  const navigate = useNavigate();

  async function toggleFavorite() {
    if (!loggedUser) {
      return navigate(PATHNAME.LOGIN);
    }
    if (isFavorite) {
      await deleteUserCar(
        variableWrapper(deleteCarVariables(loggedUser.id, id!))
      );
      setIsFavorite(false);
    } else {
      await createUserCar(
        variableWrapper({ object: { car_id: id, user_id: loggedUser.id } })
      );
      setIsFavorite(true);
    }
  }

  return (
    <Container>
      <CarImage src={img} alt={title} />
      <Column>
        <Title>{title}</Title>
        <Value>{batch}</Value>
        <FavoriteButton
          fav={isFavorite}
          onClick={() => toggleFavorite()}
          loading={favLoading || unfavLoading}
        />
      </Column>
      <Column>
        {odo && (
          <Title>
            ODOmeter
            <br />
            <Value>{odo}</Value>
          </Title>
        )}
        <Title>
          Estimated Price
          <br />
          <Value>{price}</Value>
        </Title>
      </Column>
      <Column>
        <Title>{condition}</Title>
        <Title>{damageType}</Title>
      </Column>
      <Column>
        <Title>
          Sale Date
          <br />
          {now < new Date(saleDate) ? (
            <Value>{saleDate}</Value>
          ) : (
            <RedValue>{`${saleDate} - sold`}</RedValue>
          )}
          <Value>{place}</Value>
        </Title>
      </Column>
      {/* TODO: <ReactIco3dots></ReactIco3dots> */}
    </Container>
  );
};

const Value = styled(P)``;
const RedValue = styled(Value)`
  color: ${defaultTheme.palette.red};
`;

const Title = styled(H4)`
  color: ${defaultTheme.palette.darkblue};
  font-weight: 600;
`;
const CarImage = styled.img`
  margin-right: 8px;
  max-width: 160px;
  min-width: 160px;
  flex-grow: 1;
  border-radius: 8px;
  height: 104px;
  background-color: ${defaultTheme.palette.gray};
`;
const Column = styled(FlexColumn)`
  height: 100%;
  max-width: 350px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-basis: 300px;
  flex-grow: 1;
  flex-shrink: 1;
`;
const Container = styled(FlexRow)`
  padding-left: 8px;
  align-items: center;
  justify-content: flex-start;
  height: 120px;
  background-color: ${defaultTheme.palette.white};
  border-radius: 8px;
  div:first-of-type {
    min-width: 310px;
  }
`;
