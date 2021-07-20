import React, { useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function Navigation(props) {
  const history = useHistory()

  /*// instead of handling token and user here, handled in App.js so that Login component 
  // and Navbar components can both get access
   const [token, setToken] = useState(localStorage.getItem("token"));
   const [user, setUser] = useState(localStorage.getItem("name")); */

  const logout = () => {
    localStorage.clear()
    props.setAppToken('')
    props.setAppUser('')
    history.push('/')
  }
  const roles = localStorage.getItem('roles')
  console.log(roles)
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        style={{ backgroundColor: '#848484' }}
      >
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/eie_logo.png"
            // width="30"
            // height="30"
            className="d-inline-block align-top"
          />{' '}
          {/* Academy App */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to="/">
              Home
            </Nav.Link> */}
            {roles === 'user' || roles === 'admin' ? (
              <Nav.Link as={Link} to="/startTest">
                Test
              </Nav.Link>
            ) : null}
            {roles === 'admin' && props.appUser !== '' ? (
              <Nav.Link as={Link} to="/createPlan">
                Create Plan
              </Nav.Link>
            ) : null}
            {roles === 'user' || roles === 'admin' ? (
              <Nav.Link as={Link} to="/createTest">
                Create Test
              </Nav.Link>
            ) : null}
            {roles === 'admin' && props.appUser !== '' ? (
              <Nav.Link as={Link} to="/user-scores">
                Find User Score
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav className="ms-auto">
            {!props.appUser ? (
              <Nav.Link as={Link} to="/signin">
                Login
              </Nav.Link>
            ) : (
              <Nav>
                <NavDropdown title={props.appUser}>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation
