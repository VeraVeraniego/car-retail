import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../theme";
import { FlexColumn, FlexRow, H3, H4, P } from "./styled";
import { CarRowInfo } from "../interfaces/Car";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "../utils";
import { CREATE_USER_CAR, DELETE_USER_CAR } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { deleteCarVariables } from "../graphql/variables";
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
  const [createUserCar, { error: favError, loading: favLoading }] =
    useMutation(CREATE_USER_CAR);
  const [deleteUserCar, { error: unfavError, loading: unfavLoading }] =
    useMutation(DELETE_USER_CAR);

  const now = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(!!isFav);
  }, [isFav]);

  async function toggleFavorite() {
    if (!loggedUser) {
      return navigate(PATHNAME.LOGIN);
    }
    try {
      if (isFavorite) {
        await deleteUserCar({
          variables: deleteCarVariables(loggedUser.id, id!),
          update(cache) {
            cache.modify({
              fields: {
                user_cars(existingUserCars) {
                  return existingUserCars.filter((t: any) => t.car_id !== id);
                },
              },
            });
          },
        });
        setIsFavorite(false);
      } else {
        await createUserCar({
          variables: { object: { car_id: id, user_id: loggedUser.id } },
          update(cache, { data }) {
            cache.modify({
              fields: {
                user_cars(existingUserCars = []) {
                  const newUserCar = data.insert_user_cars_one;
                  return existingUserCars.concat(newUserCar);
                },
              },
            });
          },
        });
        setIsFavorite(true);
      }
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
    }
  }

  return (
    <Container>
      <CarImage src={img} alt={title} />
      <Column>
        <Title>{title}</Title>
        <P>{batch}</P>
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
            <P>{odo}</P>
          </Title>
        )}
        <Title>
          Estimated Price
          <br />
          <P>{price}</P>
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
            <P>{saleDate}</P>
          ) : (
            <RedValue>{`${saleDate} - sold`}</RedValue>
          )}
          <P>{place}</P>
        </Title>
      </Column>
      {/* TODO: <ReactIco3dots></ReactIco3dots> */}
    </Container>
  );
};

const RedValue = styled(P)`
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
