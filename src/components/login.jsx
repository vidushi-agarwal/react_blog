import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import {refreshTokenSetup} from '../utils/refreshToken';
import {Form} from 'react-bootstrap';
import classNames from 'classnames';
const clientId='128810000233-63djpt3pr2rr2moav2ghbijsqtpkr0cv.apps.googleusercontent.com';
export default class Login extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = { 
            loggedIn:false,
            user:{
            id:'',
            name:'',
            email:'',
            },
            showCreateUserModal:false,
            isFormFullButton:false,
         };
        autoBind(this);
    }
    handleSuccess(res){
        console.log("loggedin", res.profileObj);
        this.setState({ loggedIn:true  });
        this.setState({ user:res.profileObj});
        refreshTokenSetup(res);
        
    }
    openCreateUserModal(){
        this.setState({ showCreateUserModal: true });
    }
    closeCreateUserModal(){
        this.setState({ showCreateUserModal: false });
    }
    handleFailure(){
        console.log("logged out");
    }
    handleSubmit(event){
        this.props.saveLoggedInProperties(this.state.loggedIn,this.state.user.name,this.state.user.id,this.state.user.email);
    }
    handleChange(event){
        const newData=this.state.user;
        newData[event.target.id] = event.currentTarget.value;
        this.setState({user:newData});

    }
    render() { 
        return (<div>
            <GoogleLogin
            clientId={clientId}
            render={
                renderProps =>{
                    return(<div>
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        
                        Google SignIn
                    </button>
                    <button onClick={this.openCreateUserModal}>modal</button>
                    </div>)
                }

            }
            buttonText="Login"
            onSuccess={this.handleSuccess}
            onFailure={this.handleFailure}
            cookiePolicy={'single_host_origin'}
            style={{}}
            isSignedIn={true}
            /> 
            <Modal isOpen={this.state.showCreateUserModal} backdrop='static'>
            <ModalHeader> Hi! Lets create your profile 
            <button className={classNames('btn btn-primary btn-sm',!this.state.isFormFullButton&&'disabled')} id="SUBMIT" name="SUBMIT" type="submit" onClick={this.handleSubmit} disabled={!this.state.isFormFullButton} > Submit</button>
                    
                   </ModalHeader>
                   <ModalBody>
                    <Form className='form-horizontal' id="createUserForm" onSubmit={this.handleSubmit}>
                    <fieldset>
                         
                        <div style={{height:'100px',overflowY:'scroll', overflowX:'hidden'}}>

                            <div className="form-group row">
                                <label htmlFor="name" className="col-lg-4 col-md-4 control-label">Full name</label>
                                <div className="col-lg-7 col-md-7 col-xs-7">
                                    <input type="text" className="form-control required" id="name" value={this.state.user.name} onChange={this.handleChange} required minLength='3' maxLength='150'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                                <label htmlFor="id" className="col-lg-4 col-md-4 control-label">User Id</label>
                                <div className="col-lg-7 col-md-7 col-xs-7">
                                    <input type="text" className="form-control required" id="id" value={this.state.user.id} onChange={this.handleChange} required minLength='3' maxLength='150'/>
                                </div>
                         </div>
                         
                    </fieldset>
                    </Form>
                
                   </ModalBody>
                </Modal>
            </div>
            );
    }
}
Login.contextTypes={
    loggedIn:PropTypes.bool.isRequired,
    userId:PropTypes.string.isRequired,
    userName:PropTypes.string.isRequired,
};
 

 
