/* eslint-disable indent */
import { Cars, User_Cars } from "../graphql/generated/graphql";
import { CarRowInfo } from "../interfaces/Car";

export enum Condition {
  A = "Salvage Title",
  N = "New",
  O = "Other",
}
export function responseCarToCarComponent(queryCar: Cars) {
  const shapedCar: CarRowInfo = {
    id: queryCar.id,
    title: queryCar.title!,
    // title: `${queryCar.model.brand.name} ${queryCar.model.name} ${queryCar.year}`,
    batch: queryCar.batch,
    vin: queryCar.vin,
    odo: queryCar.odometer ?? "",
    price: queryCar.price,
    condition:
      queryCar.condition === "A"
        ? Condition.A
        : queryCar.condition === "N"
        ? Condition.N
        : Condition.O,
    damageType: queryCar.damage_type ? queryCar.damage_type : "",
    saleDate: queryCar.sale_date,
    place: `${queryCar.city.name}-${queryCar.city.state.name}`,
    isFavorite: false,
  };
  return shapedCar;
}

export function adaptResponse(cars: Cars[], userCars: User_Cars[]) {
  const mapped = cars.map((car) => {
    const newCar = responseCarToCarComponent(car as Cars);
    newCar.isFavorite = !!userCars.find((fav) => car.id == fav.car_id);
    return newCar;
  });
  return mapped;
}

export function removeFavorites(cars: CarRowInfo[]) {
  const cleaned = cars.map((car) => {
    return { ...car, isFavorite: false };
  });
  return cleaned;
}

export function adaptFavorites(cars: Cars[], userCars: User_Cars[]) {
  const filtered = cars.filter((car) => {
    return userCars.find((fav) => car.id === fav.car_id);
  });
  const mapped = filtered.map((car) => {
    const newCar = responseCarToCarComponent(car as Cars);
    newCar.isFavorite = true;
    return newCar;
  });
  return mapped;
}
