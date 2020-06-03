import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  header {
    margin-top: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: #322153;
      font-family: 'Ubunto', sans-serif;
      font-weight: bold;
      text-decoration: none;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
        color: #2FB86E;
      }
    }
  }

  form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #FFF;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 36px;
      color: #322153;
      font-family: 'Ubuntu', sans-serif;
      font-weight: bold;
    }

    fieldset {
      margin-top: 64px;
      min-inline-size: auto;
      border: 0;
    }

    legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      h2 {
        font-size: 24px;
        color: #322153;
        font-family: 'Ubuntu', sans-serif;
        font-weight: bold;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: #322153;
        font-family: 'Ubuntu', sans-serif;
      }
    }

    .field {
      flex: 1;

      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
    }

    .field input[type=number],
    .field input[type=email],
    .field input[type=text] {
      flex: 1;
      background: #F0F0F5;
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: #6C6C80;
    }

    .field select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex: 1;
      background: #F0F0F5;
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: #6C6C80;
    }

    .field input::placeholder {
      color: #A0A0B2;
    }

    .field label {
      font-size: 14px;
      margin-bottom: 8px;
      color: #322153;
      font-family: 'Ubuntu', sans-serif;
    }

    .field :disabled {
      cursor: not-allowed;
    }

    .field-group {
      display: flex;
    }

    .field-group .field + .field {
      margin-left: 24px;
    }

    .field-group input + input {
      margin-left: 24px;
    }

    .field-check {
      flex-direction: row;
      align-items: center;
    }

    .field-check input[type=checkbox] {
      background: #F0F0F5;
    }

    .field-check label {
      margin: 0 0 0 8px;
    }

    .leaflet-container {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
    }

    button {
      width: 260px;
      height: 56px;
      background: #2Fa06E;
      border-radius: 8px;
      color: #FFF;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      align-self: flex-end;
      margin-top: 40px;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    button:hover {
      background: #2FB86E;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      list-style: none;
    }

    .items-grid li {
      background: #f5f5f5;
      border: 2px solid #f5f5f5;
      height: 180px;
      border-radius: 8px;
      padding: 32px 24px 16px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      text-align: center;

      cursor: pointer;
    }

    .items-grid li span {
      flex: 1;
      margin-top: 12px;

      display: flex;
      align-items: center;
      color: #322153;
      font-family: 'Ubuntu', sans-serif;
    }

    .items-grid li.selected {
      background: #E1FAEC;
      border: 2px solid #34CB79;
    }
  }
`;