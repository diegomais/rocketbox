import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c, #402845);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      height: 44px;
      margin-top: 10px;
      padding: 0 15px;
      border: 0;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input + span {
      align-self: flex-start;
      margin: 5px 15px 0;
      color: #f94d6a;
    }

    button {
      height: 44px;
      margin-top: 15px;
      border: 0;
      border-radius: 4px;
      background: #f94d6a;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }

    span {
      margin-top: 15px;
      font-size: 16px;
      color: #fff;
      opacity: 0.8;

      a {
        color: #f94d6a;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
