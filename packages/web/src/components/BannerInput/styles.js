import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  align-self: center;
  text-align: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      border-radius: 4px;
      background: #000;
      opacity: 0.4;
      color: #fff;
      font-weight: bold;
      font-size: 20px;

      svg {
        margin-bottom: 10px;
      }
    }

    img {
      max-width: 100%;
      max-height: 300px;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;
