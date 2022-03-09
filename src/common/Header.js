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
import i18n from '../translation/i18n';
import { withTranslation } from 'react-i18next';

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
    const { t } = this.props;
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
            <Navbar.Brand to="/home/" className="mx-3">
              <Link to="/home/">
                <Image src="/assets/logo.svg" alt="" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="m-auto" onSelect={this.closeMenu}>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/home/restaurants"
                >
                  {t('Resturants')}
                </Nav.Link>
                {/* <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/home/contact-us"
                >
                  Contact Us
                </Nav.Link> */}
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to={{
                    pathname:
                      'https://restaurant-dashboard.se01.tech/restaurants/create',
                  }}
                  target="_blank"
                >
                  {t('Join Us')}
                </Nav.Link>
                {localStorage.getItem('token') ? (
                  <Nav.Link
                    eventKey={0}
                    as={NavLink}
                    activeclassname="active"
                    to="/home/my-reservations"
                  >
                    {t('My Reservations')}
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
                        title={t('My Account')}
                      />
                    }
                  >
                    <NavDropdown.Item
                      eventKey={4.3}
                      as={NavLink}
                      activeclassname="active"
                      to="/home/edit-profile/"
                    >
                      <Icofont icon="pepole" /> {t('Edit Profile')}
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      eventKey={5}
                      as={NavLink}
                      onClick={() => {
                        localStorage.removeItem('token');
                      }}
                      to="/vkslndj"
                    >
                      {t('Log Out')}
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    eventKey={0}
                    as={NavLink}
                    activeclassname="active"
                    to="/login"
                  >
                    <a>{t('Log In')}</a>
                  </Nav.Link>
                )}
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  onClick={() => {
                    i18n.changeLanguage(
                      i18n.language.includes('ar') ? 'en' : 'ar'
                    );
                    document.body.dir = i18n.dir();
                    const style =
                      document.getElementsByClassName('style-direction');
                    if (i18n.language.includes('ar')) {
                      style[0].href = '/css/AppRTL.css';
                      style[1].href = '/css/bootstrapRTL.css';
                      style[2].href = '/css/select2RTL.css';
                    } else {
                      style[0].href = '/css/App.css';
                      style[1].href = '/css/bootstrap.css';
                      style[2].href = '/css/select2.css';
                    }
                  }}
                  to
                >
                  {i18n.language.includes('ar') ? 'en' : 'عربي'}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withTranslation()(Header);
