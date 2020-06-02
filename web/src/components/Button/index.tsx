import React from 'react';

import logo from '../../assets/Logo.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt="Logo Ecoleta"/>
    </Container>
  );
}

export default Header;