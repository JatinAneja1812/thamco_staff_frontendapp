import React from "react";
import { Input, Button } from "antd";
import DropdownWrapper from "./SearchInputDropdown.styles";

const SearchInputDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  return (
    <DropdownWrapper>
      <Input
        className="search-input"
        autoFocus={true}
        placeholder="Search text"
        value={selectedKeys[0]} // selectedKeys is an array of either 1 or 0 elements - 1 when there is a search string, 0 if there isn't
        onChange={(e) => {
          setSelectedKeys([e.target.value.length > 0 ? [e.target.value] : []]);
          //confirm({ closeDropdown: false});     Uncomment this to make the search react on every key press
        }}
        onPressEnter={() => {
          confirm();
        }}
      ></Input>
      <Button
        className="search-btn"
        type="primary"
        onClick={() => {
          confirm();
        }}
      >
        Search
      </Button>
      <Button
        className="reset-btn"
        type="primary"
        danger
        onClick={() => {
          clearFilters();
          confirm();
        }}
      >
        Reset
      </Button>
    </DropdownWrapper>
  );
};

export default SearchInputDropdown;
