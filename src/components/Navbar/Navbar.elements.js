import styled from 'styled-components'
import {GiTigerHead} from "react-icons/all";
import { Link } from 'react-router-dom'
import { StyledContainer } from '../../globalStyles'
import {NavDropdown} from "react-bootstrap";


export const Nav = styled.nav`
  background: #101522;
  height: 80px;
  display: flex;
  justify-content: center;
  //align-items: center;
  font-size: 1.1rem;
  position: sticky;
  top: 0;
  z-index: 999;

  @media screen and (max-width: 1280px) {
    font-size: 1.2rem;
  }
`

export const NavbarContainer = styled(StyledContainer)`
  display: flex;
  justify-content: space-between;
  height: 90px;

  ${StyledContainer}
`

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;

  &:hover {
    //color: #4b59f7;
    color: #a50d18;
    transition: all 0.3s ease;
  }
`

export const NavIcon = styled(GiTigerHead)`
  margin-right: 0.5rem;
`

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 1280px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 1280px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: #101522;
  }
`
export const Dropdown = styled(NavDropdown)`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  height: 80px;
  border-bottom: 2px solid transparent;

  @media screen and (max-width: 1280px) {
    width: 100%;
    display: flex;
    align-items: center;
  }
`

// export const DropdownNavItem = styled.li`
//   height: 80px;
//   border-bottom: 2px solid transparent;
//
//   &:hover {
//     //border-bottom: 2px solid #4b59f7;
//     border-bottom: 2px solid #a50d18;
//   }
//
//   @media screen and (max-width: 960px) {
//     width: 100%;
//
//     &:hover {
//       border: none;
//     }
//   }
// `

export const NavItem = styled.li`
  height: 70px;
  border-bottom: 2px solid transparent;

  &:hover {
    //border-bottom: 2px solid #4b59f7;
    border-bottom: 2px solid #a50d18;
  }

  @media screen and (max-width: 1280px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  &:hover {
    //color: #4b59f7;
    color: #a50d18;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: 1280px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      //color: #4b59f7;
      color: #a50d18; 
      transition: all 0.3s ease;
    }
  }
`

export const NavItemBtn = styled.li`
  @media screen and (max-width: 1280px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
  }
`

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`
