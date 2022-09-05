import { Cars } from "../graphql/generated/graphql";
import { CarRowInfo } from "../interfaces/Car";

export function responseCarToCarComponent(queryCar: Cars) {
  const shapedCar: CarRowInfo = {
    id: queryCar.id,
    title: `${queryCar.model.brand.name} ${queryCar.model.name} ${queryCar.year}`,
    batch: queryCar.batch,
    vin: queryCar.vin,
    odo: queryCar.odometer ? queryCar.odometer : "",
    price: queryCar.price,
    condition:
      queryCar.condition === "A"
        ? "Salvage Title"
        : queryCar.condition === "N"
        ? "New"
        : "Other",
    damageType: queryCar.damage_type ? queryCar.damage_type : "",
    saleDate: queryCar.sale_date,
    place: `${queryCar.city.name}-${queryCar.city.state.name}`,
  };
  return shapedCar;
}
