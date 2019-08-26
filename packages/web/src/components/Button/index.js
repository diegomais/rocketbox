import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

function Button({ children, ...options }) {
  return <StyledButton {...options}>{children}</StyledButton>;
}

Button.propTypes = { children: PropTypes.element.isRequired };

export default Button;
