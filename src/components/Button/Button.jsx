import { StyledButton } from 'components/Button/Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
