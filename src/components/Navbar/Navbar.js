import React, {useState, useEffect} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {Button} from '../../globalStyles'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink,
} from './Navbar.elements'
import {Link, useHistory} from "react-router-dom";

const Navbar = (props) => {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const history = useHistory();

    const handleClick = () => setClick(!click)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    const logout = () => {
        localStorage.clear()
        props.setAppToken('')
        props.setAppUser('')
        history.push('/')
    }
    const roles = localStorage.getItem('roles')

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    return (
        <>
            <IconContext.Provider value={{color: '#a50d18'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/">
                            <NavIcon/>
                            EiE SUSUNG
                            {/*<img*/}
                            {/*    alt=""*/}
                            {/*    src="/academy-frontend/eie_logo.png"*/}
                            {/*    // width="30"*/}
                            {/*    // height="30"*/}
                            {/*    className="d-inline-block align-top"*/}
                            {/*/>{' '}*/}
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes/> : <FaBars/>}
                        </MobileIcon>
                        <NavMenu onClick={handleClick} click={click}>
                            <NavItem>
                                {roles === 'user' || roles === 'admin' ? (
                                <NavLinks to="/tests">Tests</NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItem>
                                {roles === 'user' || roles === 'admin' ? (
                                        <NavLinks as={Link} to="/word-list">Word List</NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItem>
                                {roles === 'admin' && props.appUser !== '' ? (
                                        <NavLinks as={Link} to="/createPlan">
                                            Create Plan
                                        </NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItem>
                                {roles === 'admin' && props.appUser !== '' ? (
                                        <NavLinks as={Link} to="/createTest">
                                            Create Test
                                        </NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItem>
                                {roles === 'admin' && props.appUser !== '' ? (
                                        <NavLinks as={Link} to="/create-users">Create User</NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItem>
                                {roles === 'admin' && props.appUser !== '' ? (
                                        <NavLinks as={Link} to="/users">Users</NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItem>
                                {roles === 'admin' && props.appUser !== '' ? (
                                        <NavLinks as={Link} to="/user-scores">User Scores</NavLinks>)
                                    :
                                    null}
                            </NavItem>
                            <NavItemBtn>
                                {!props.appUser ? (
                                    <NavBtnLink as={Link} to="/signin">
                                        <Button primary>SIGN IN</Button>
                                    </NavBtnLink>
                                ) : (
                                    <Nav>
                                        <NavBtnLink as={Link} to="/signin">
                                            <Button primary onClick={logout}>LOGOUT</Button>
                                        </NavBtnLink>
                                    </Nav>
                                )}
                            </NavItemBtn>
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
