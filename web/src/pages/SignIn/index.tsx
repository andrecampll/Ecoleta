import React from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';

import pessoas from '../../assets/Pessoas.svg';

import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
        <Header />
      <main>
        <Content>
          <h1>
            Seu marketplace de coleta de resíduos.
          </h1>
          <h2>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </h2>

          <Button />
        </Content>
        <img src={pessoas} alt="Logo Ecoleta"/>
      </main>
    </Container>
  );
}

export default SignIn;