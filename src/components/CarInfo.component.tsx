import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { useUser } from "../contexts/User";
import { UserContext } from "../contexts/UserContext";
import { User_Cars, useUsersLazyQuery } from "../graphql/generated/graphql";
import { CREATE_USER_CAR, DELETE_USER_CAR } from "../graphql/mutations";
import { deleteCarVariables } from "../graphql/variables";
import { CarRowInfo } from "../interfaces/Car";
import { defaultTheme } from "../theme";
import { PATHNAME } from "../utils";
import { FavoriteButton } from "./FavoriteButton.component";
import { FlexColumn, FlexRow, H4, P } from "./styled";

export const CarInfo = ({ img, car }: { img: string; car: CarRowInfo }) => {
  const { userLogged } = useUser();
  // const { loggedUser } = useContext(UserContext);
  const [isFav, setIsFavorite] = useState<boolean>(car.isFavorite);
  const [createUserCar, { loading: favLoading }] = useMutation(CREATE_USER_CAR);
  const [deleteUserCar, { loading: unfavLoading }] =
    useMutation(DELETE_USER_CAR);

  const now = new Date();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setIsFavorite(!!car.isFavorite);
  // }, [car.isFavorite]);

  async function toggleFavorite() {
    if (!userLogged) {
      return navigate(PATHNAME.LOGIN);
    }
    try {
      if (car.isFavorite) {
        await deleteUserCar({
          variables: deleteCarVariables(userLogged.id, car.id!),
          update(cache) {
            cache.modify({
              fields: {
                user_cars(existingUserCars) {
                  return existingUserCars.filter(
                    (userFavorite: User_Cars) => userFavorite.car_id !== car.id
                  );
                },
              },
            });
          },
        });
        setIsFavorite(false);
      } else {
        await createUserCar({
          variables: { object: { car_id: car.id, user_id: userLogged.id } },
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
      toast.warn("Can't change favorites now, try again later");
    }
  }

  return (
    <Container>
      <CarImage src={img} alt={car.title} />
      <Column>
        <Title>{car.title}</Title>
        <P>{car.batch}</P>
        <FavoriteButton
          fav={car.isFavorite}
          onClick={() => toggleFavorite()}
          loading={favLoading || unfavLoading}
        />
      </Column>
      <Column>
        {car.odo && (
          <Title>
            ODOmeter
            <br />
            <P>{car.odo}</P>
          </Title>
        )}
        <Title>
          Estimated Price
          <br />
          <P>{car.price}</P>
        </Title>
      </Column>
      <Column>
        <Title>{car.condition}</Title>
        <Title>{car.damageType}</Title>
      </Column>
      <Column>
        <Title>
          Sale Date
          <br />
          {now < new Date(car.saleDate) ? (
            <P>{car.saleDate}</P>
          ) : (
            <RedValue>{`${car.saleDate} - sold`}</RedValue>
          )}
          <P>{car.place}</P>
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
