import SourceLink from 'components/SourceLink';
import React from 'react';
import {

  MdInsertChart,

  MdExplore,
  MdLocalTaxi,
  MdList
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
};




const navItems = [
  { to: '/admin', name: 'statistics', exact: true, Icon: MdInsertChart },
  { to: '/admin/trips', name: 'trips', exact: false, Icon: MdExplore },
  { to: '/admin/vehicles', name: 'vehicles', exact: false, Icon: MdLocalTaxi },
  { to: '/admin/reservations', name: 'reservations', exact: false, Icon: MdList },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      
      <aside className={bem.b()}>
        <div style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              {/* <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              /> */}
              <span className="text-white">
                Cotisse-transport
                {/* Cotisse-transport <FaGithub /> */}
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
