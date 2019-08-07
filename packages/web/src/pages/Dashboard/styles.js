import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;

  header {
    margin: 52px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h1 {
      font-size: 32px;
      color: #fff;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 172px;
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
  }
`;

export const Meetup = styled.li`
  a {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    padding: 20px 30px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    strong {
      color: #fff;
      font-size: 18px;
    }

    span {
      color: #999;
      font-size: 16px;
    }
  }
`;
