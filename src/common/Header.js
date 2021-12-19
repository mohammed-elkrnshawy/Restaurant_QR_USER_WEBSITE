import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Badge,
} from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';

import Icofont from 'react-icofont';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false,
    };
  }
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }
  render() {
    return (
      <div ref={(node) => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/home/about">
              <Link to="das">
                <Image src="/assets/logo.svg" alt="" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/home"
                >
                  Resturants
                </Nav.Link>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/home/contact-us"
                >
                  Contact Us
                </Nav.Link>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="https://restaurant-dashboard.se01.tech/restaurants/create"
                  target="_blank"
                >
                  Join Us
                </Nav.Link>
                {localStorage.getItem('token') ? (
                  <Nav.Link
                    eventKey={0}
                    as={NavLink}
                    activeclassname="active"
                    to="/home/my-reservations"
                  >
                    My reservations
                  </Nav.Link>
                ) : (
                  ''
                )}
                {localStorage.getItem('token') ? (
                  <NavDropdown
                    alignRight
                    title={
                      <DropDownTitle
                        className="d-inline-block"
                        title="My Account"
                      />
                    }
                  >
                    <NavDropdown.Item
                      eventKey={4.3}
                      as={NavLink}
                      activeclassname="active"
                      to="/home/edit-profile/"
                    >
                      <Icofont icon="pepole" /> Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      eventKey={5}
                      as={NavLink}
                      onClick={() => {
                        localStorage.removeItem('token');
                      }}
                      to="/vkslndj"
                    >
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    eventKey={0}
                    as={NavLink}
                    activeclassname="active"
                    to="/login"
                  >
                    <a>Log In</a>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
