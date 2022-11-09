export interface CarsState {
  carsState: [
    CarRowInfo[] | null,
    React.Dispatch<React.SetStateAction<CarRowInfo[] | null>>
  ];
}
export interface FiltersState {
  filtersState: [Filters, React.Dispatch<React.SetStateAction<Filters>>];
}
export interface CarsAndFiltersState extends CarsState, FiltersState {}
export interface CarRowInfo {
  id?: string | number;
  isFavorite: boolean;
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
export interface Filters {
  searchInput: string;
  orderBy: string;
}
export type SortOrder = "" | "ASC" | "DESC";
