import React from 'react';
import autobind from 'react-autobind';
import {Navbar,NavbarBrand,Collapse, Nav, NavItem, NavLink,DropdownItem,UncontrolledDropdown,DropdownToggle,DropdownMenu} from 'reactstrap';
import { BrowserRouter as Router,Switch } from "react-router-dom";
import NavBarSecond from './navbarSecond';
import PropTypes from 'prop-types';
import Logout from './logout';
import Login from './login';

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state={
          navbarOpen: true,
          loggedIn: false, //stalker needs to be logged to follow the @stalkedUser
          userName:'',
          userId:'', //it is user id of stalker
          userEmail:'',
          followers: 23,//stalked
          stalkedUserId:'thestalked'
        };
        autobind(this);
    }
    componentDidMount(){

    }
    getChildContext(){
      return{
        loggedIn: this.state.loggedIn,
        userName: this.state.userName,
        userId: this.state.userId,
        userEmail: this.state.userEmail,
        followers:this.state.followers,
        stalkedUserId:this.state.stalkedUserId
      }
    }
    handleFollow(){
      this.setState({followers:this.state.followers+1});
    }
    saveLoggedInProperties(loggedIn,userName,userId,userEmail){
      this.setState({loggedIn:loggedIn});
      this.setState({userName:userName});
      this.setState({userId:userId});
      this.setState({userEmail:userEmail});
    }
    // saveUserId(userId){
    //   this.setState({userId:userId});
    // }
    saveLoggedOffProperty(loggedIn){
      this.setState({loggedIn:loggedIn});
    }

    render() {
      const NavBarInstance=()=>{
        return (
          <div>
          <div >
            <Navbar fluid expand="lg" className="fixed-top" color="light" light>
              <NavbarBrand>Blogger</NavbarBrand>
              <Collapse isOpen={!this.state.navbarOpen} navbar>
                <Nav className="mr-0 mt-4" navbar>
                  <NavItem className="pull-right pt-0 pb-0 pr-5">
                    <NavLink href="/">LightDark</NavLink>
                  </NavItem>
                  <NavItem className="pull-right pt-0 pb-0 pr-5">
                    {this.state.userId===''?(
                      null
                    ):(
                    <button onClick={this.handleFollow}>+Follow</button>
                    )}
                  </NavItem>
                  {!this.state.loggedIn?(
                  <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Login saveLoggedInProperties={(loggedIn,userName,userId,userEmail)=>this.saveLoggedInProperties(loggedIn,userName,userId,userEmail)} />
                 {/* <Login saveLoggedInProperties={(loggedIn,userName,userId,userEmail)=>this.saveLoggedInProperties(loggedIn,userName,userId,userEmail)} saveUserId={(userId)=>this.saveUserId(userId)}/> */}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Tour
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            ):(
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
                 Hi {this.state.userId}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                 New Article
                </DropdownItem>  
                <DropdownItem>
                <Logout saveLoggedOffProperty={(loggedIn)=>this.saveLoggedOffProperty(loggedIn)}/>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )}
                </Nav>
              </Collapse>
            </Navbar>
            </div>
            
            <div style={{paddingTop:56}} >
            <NavBarSecond/>
            </div>
            
            </div>
          
         );
    }
  
  return(
     
          <Router>
            <div className='fixed-layout'>
            <header><NavBarInstance/>
            </header>
          <div className='container-fluid'>
            <main>
          <Switch>
            {/* <Route path='/' exact component={Home} /> */}
             
          </Switch>
          {/* <Footer /> */}
          </main>
          </div>
          </div>
        </Router>
  );
}
}
NavBar.childContextTypes={
  loggedIn:PropTypes.bool,
  userId:PropTypes.string,
  userName:PropTypes.string,
  userEmail:PropTypes.string,
  followers:PropTypes.number,
  stalkedUserId:PropTypes.string

};

