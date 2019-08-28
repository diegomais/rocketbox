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

  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    button {
      margin-left: 15px;
    }
  }
`;

export const Banner = styled.img`
  width: 100%;
`;

export const Text = styled.div`
  margin-top: 25px;
  font-size: 18px;
  line-height: 32px;
  color: #fff;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 30px 0;
  font-size: 16px;
  line-height: 18px;
  color: #fff;
  opacity: 0.6;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 30px;

    svg {
      margin-right: 10px;
    }
  }
`;
