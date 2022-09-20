import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { defaultTheme } from "../theme";
import { URL_PARAMS } from "../utils/constants";
import { ButtonOnHoverOppacity, Form, Input } from "./styled";

export const CarSearchForm = ({ searchInInventory }: any) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useSearchParams();
  const searchInUrl = search.get(URL_PARAMS.SEARCH);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      {/* <SearchLogo /> */}
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
