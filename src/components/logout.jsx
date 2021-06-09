import React, { Component } from 'react';
import autobind from 'react-autobind';
import {GoogleLogout} from 'react-google-login';
const clientId='128810000233-63djpt3pr2rr2moav2ghbijsqtpkr0cv.apps.googleusercontent.com';
export default class Logout extends Component {
    constructor(props, context){
        super(props, context);
        this.state={
            loggedIn: true,
        };
        autobind(this);
    }
    onLogoutSuccess(){
    console.log('logged out');
    this.setState({loggedIn:false});
    this.props.saveLoggedOffProperty(this.state.loggedIn);
    }
    render() { 
        return (  
            <div>
                <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={this.onLogoutSuccess}
                />
            </div>

        );
    }
}
 
