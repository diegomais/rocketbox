import styled from 'styled-components';
import { darken } from 'polished';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: 4px;
  background: ${props => (props.primary ? '#4dbaf9' : '#f94d6a')};
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  transition: background 0.2s;

  &:hover {
    background: ${props =>
      props.primary ? darken(0.05, '#4dbaf9') : darken(0.05, '#f94d6a')};
  }

  svg {
    margin-right: 8px;
  }
`;
