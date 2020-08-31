import styled from 'styled-components';

export const Container = styled.article`
  max-width: 940px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 50px 0;

  h1 {
    font-size: 32px;
    color: #fff;
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

    div {
      display: flex;
      align-items: center;
      flex-direction: row;

      span {
        margin-right: 30px;
        color: #fff;
        opacity: 0.6;
        font-size: 16px;
      }
    }
  }
`;

export const Text = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #fff;
`;
