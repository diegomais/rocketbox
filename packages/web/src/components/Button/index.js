import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

function Button({ children, ...options }) {
  return <StyledButton {...options}>{children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Button;
