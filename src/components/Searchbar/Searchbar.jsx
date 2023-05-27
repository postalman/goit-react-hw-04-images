import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchFormButton,
  StyledSearchFormButtonLabel,
  StyledSearchFormInput,
} from 'components/Searchbar/SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <StyledSearchbar>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchFormButton type="submit">
          <StyledSearchFormButtonLabel>
            <AiOutlineSearch />
          </StyledSearchFormButtonLabel>
        </StyledSearchFormButton>

        <StyledSearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </StyledSearchForm>
    </StyledSearchbar>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
