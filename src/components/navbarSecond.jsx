import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import {Navbar,NavbarBrand,Nav, NavItem, NavLink,Collapse} from 'reactstrap';
import { withRouter } from 'react-router';

class NavBarSecond extends Component {
    constructor(props,context){
        super(props,context);
    this.state = {  };
    // this.navigation=[
    //   {linkText: 'Home', linkUrl: '/'},
    //   {linkText: 'Articles', linkUrl:'/articles'},
    //   {linkText: 'SocialMedia', linkUrl:'#',
    //    subNavigation:[
    //      {linkText: 'Facebook', linkUrl: '/facebook'},
    //   {linkText: 'Instagram', linkUrl:'/instagram'}
    //   ]
    //   },
    // ];
    autoBind(this);
    }
    render() { 
        return ( 
            <Navbar fluid expand="lg"color="light" light>
            <NavbarBrand>@{this.context.stalkedUserId},{this.context.followers}followers</NavbarBrand>
            <Collapse isOpen={!this.state.navbarOpen} navbar>
              <Nav className="mr-0 mt-4" navbar>
                <NavItem className="pull-right pt-0 pb-0 pr-5">
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem className="pull-right pt-0 pb-0 pr-5">
                  <NavLink  href="/articles">Article</NavLink>
                </NavItem>
                <NavItem className="pull-right pt-0 pb-0 pr-5">
                  <NavLink href="/">Social Media</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
         );
    }
}
NavBarSecond.contextTypes={
    loggedIn:PropTypes.bool.isRequired,
  userId:PropTypes.string.isRequired,
  userName:PropTypes.string.isRequired,
  followers:PropTypes.number,
  stalkedUserId:PropTypes.string,

};
export default withRouter(NavBarSecond);
