export interface CarState {
  cars: CarRowInfo[] | null;
  setCars: React.Dispatch<React.SetStateAction<CarRowInfo[] | null>>;
}
export interface CarRowInfo {
  id?: string | number;
  img?: string;
  title: string;
  batch: string;
  vin?: string;
  odo: string | number;
  price: string;
  condition: string;
  damageType: string;
  saleDate: string;
  place: string;
}
export interface FiltersState {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
export interface Filters {
  searchInput: string;
  orderBy: string;
}
export interface CarsAndFilters extends CarState, FiltersState {}
