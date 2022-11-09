import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { defaultTheme } from "../theme";
import { URL_PARAMS } from "../utils/constants";
import { ButtonOnHoverOppacity, Form, Input } from "./styled";

type Props = {
  searchInInventory: (T: string) => void;
};

export const CarSearchForm = ({ searchInInventory }: Props) => {
  const [search, setSearch] = useSearchParams();
  const searchInUrl = search.get(URL_PARAMS.SEARCH);
  const [searchInput, setSearchInput] = useState<string>(searchInUrl ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search.set(URL_PARAMS.SEARCH, searchInput);
    setSearch(search);
    searchInInventory(searchInput);
  }

  return (
    <SearchForm onSubmit={(e) => handleSubmit(e)}>
      <SearchVector />
      <SearchInput
        defaultValue={searchInUrl as string}
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
      ></SearchInput>
      <SearchButton>Search in Inventory</SearchButton>
    </SearchForm>
  );
};

const SearchVector = styled(MdSearch)`
  font-size: 16px;
  margin-left: 8px;
  margin-right: 8px;
`;

const SearchForm = styled(Form)`
  background-color: ${defaultTheme.palette.white};
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 500px;
  width: 100%;
  height: 29px;
  border-radius: 4px;
`;

const SearchInput = styled(Input)`
  width: 100%;
  outline: none;
`;

const SearchButton = styled(ButtonOnHoverOppacity)`
  width: 160px;
  color: ${defaultTheme.palette.darkblue};
  background-color: ${defaultTheme.palette.green};
`;
