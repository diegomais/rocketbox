import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input,
    textarea {
      margin-top: 10px;
      border: 0;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input {
      height: 50px;
      padding: 0 15px;
    }

    textarea {
      padding: 15px;
      height: 200px;
      font: 14px 'Roboto', sans-serif;
    }

    span {
      align-self: flex-start;
      margin: 5px 15px 0;
      font-weight: bold;
      color: #fb6f91;
    }

    button {
      align-self: flex-end;
      margin: 20px 0;
    }
  }
`;
