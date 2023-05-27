import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchFormButton,
  StyledSearchFormButtonLabel,
  StyledSearchFormInput,
} from 'components/Searchbar/SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

class SearchBar extends React.Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
  };

  render() {
    const { query } = this.state;
    return (
      <StyledSearchbar>
        <StyledSearchForm onSubmit={this.handleSubmit}>
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
            onChange={this.handleInputChange}
          />
        </StyledSearchForm>
      </StyledSearchbar>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
