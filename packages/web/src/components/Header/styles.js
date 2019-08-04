import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #000;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 31px;
    height: 32px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #999;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  button {
    width: 71px;
    height: 42px;
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
`;
