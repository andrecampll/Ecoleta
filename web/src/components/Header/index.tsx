import React from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import logo from '../../assets/logodarkalternative.png';

import { Container } from './styles';

interface Props {
  toggleTheme(): void,
}

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="Ecoleta"/>

      {/* <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor="#ccc"
        onColor="#333"
      /> */}

    </header>
  );
}

export default Header;