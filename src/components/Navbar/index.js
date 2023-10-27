import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../images/logo.png')} alt='logo' width="342" height="95" style={{opacity: '0.9'}}/>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/book' activeStyle style={{opacity: '0.9'}}>
            Book Your Seat!
          </NavLink>
          <NavLink to='/myreservations' activeStyle style={{opacity: '0.9'}}>
            My Reservations
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;