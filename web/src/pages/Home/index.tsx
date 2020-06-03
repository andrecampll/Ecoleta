import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

// import Header from '../../components/Header';
// import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { Container, Content, } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
        
          <Link to="/register">
            <span>
              <FiLogIn />
            </span>
            <strong>
              Cadastre um ponto de coleta
            </strong>
          </Link>
        </main>
      </Content>
    </Container>
  );
}
export default SignIn;