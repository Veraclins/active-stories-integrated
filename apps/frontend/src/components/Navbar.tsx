import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

import { rem } from 'styles';
import Navigation from 'components/Navigation';

interface NavbarProps {
  theme: any;
}

interface MenuProps {
  active: boolean;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ theme }) => {
  const [navActive, toggleNav] = useState(false);
  const location = useLocation();

  return (
    <Container theme={theme}>
      <NavLeft>
        <Logo theme={theme}>
          <NavLink to="/">Active Stories</NavLink>
        </Logo>
        <Menu
          theme={theme}
          active={navActive}
          onClick={() => toggleNav(!navActive)}
        >
          <span />
          <span />
          <span />
          <span />
        </Menu>
      </NavLeft>
      <NavRight active={navActive}>
        <Navigation
          onClick={() => toggleNav(!navActive)}
          theme={theme}
          pathname={location.pathname}
        />
      </NavRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: ${rem(80)};
  padding: ${rem(20)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-size: ${rem(20)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  @media screen and (min-width: ${rem(480)}) {
    flex-direction: row;
    height: ${rem(100)};
    justify-content: space-between;
    padding: ${rem(20)} ${rem(50)};
  }
`;

const NavLeft = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: ${rem(480)}) {
    width: 30%;
  }
`;

const NavRight = styled.div<MenuProps>`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: ${rem(20)} 0;
  box-sizing: border-box;

  @media screen and (min-width: ${rem(480)}) {
    display: flex;
    margin: 0;
    flex-direction: row;
    width: 30%;
  }
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.logoColor};
  line-height: 120%;
  font-size: ${rem(26)};
  letter-spacing: ${rem(4)};
  @media screen and (min-width: ${rem(480)}) {
    font-size: ${rem(34)};
    letter-spacing: ${rem(10)};
  }
`;

const Menu = styled.div<MenuProps>`
  width: ${rem(30)};
  height: ${rem(25)};
  position: relative;
  display: block;
  span {
    background: ${({ theme }) => theme.logoColor};
    width: ${rem(30)};
    height: ${rem(3)};
    display: block;
    margin: ${rem(-2)} 0 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transition: 0.3s ease;
    &:first-child {
      top: 0;
      opacity: ${({ active }) => (active ? 0 : 1)};
    }
    &:last-child {
      bottom: 0;
      opacity: ${({ active }) => (active ? 0 : 1)};
      top: auto;
    }
    &:nth-child(2) {
      transform: ${({ active }) => active && 'rotate(45deg)'};
    }
    &:nth-child(3) {
      transform: ${({ active }) => active && 'rotate(-45deg)'};
    }
  }
  @media screen and (min-width: ${rem(480)}) {
    display: none;
  }
`;

export default Navbar;
