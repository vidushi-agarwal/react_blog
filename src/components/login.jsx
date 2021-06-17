import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import {refreshTokenSetup} from '../utils/refreshToken';
import {Form} from 'react-bootstrap';
import classNames from 'classnames';
// import json from '../users.json';
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
            isFormFullButton:true,
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
        this.setState(prevState => ({
            showCreateUserModal: !prevState.showCreateUserModal
          }));
        // this.setState({ showCreateUserModal: true });
    }
    closeCreateUserModal(){
        this.setState(prevState => ({
            showCreateUserModal: !prevState.showCreateUserModal
          }));
    }
    handleFailure(){
        console.log("logged out");
    }
    handleSubmit(event){
        event.preventDefault();
        var action = '';
        action=event.currentTarget.attributes[0].ownerDocument.activeElement.id.toString();
        console.log(action);
        var newData=this.state.user;
        this.setState({ user:newData  });
        this.closeCreateUserModal();
        this.props.saveLoggedInProperties(this.state.loggedIn,this.state.user.name,this.state.user.id,this.state.user.email);
        var ar=[];
        ar.push(this.state.user);
        console.log(ar);
        
        // RestApi._post(RestApi.getBloggerServiceUrl()+actions,ar)
        // .then(resp => {
        //     if( resp.status === 200){
        //         resp.json().then(json => {
                    this.context.updateMessage('Changes are saved ', 'success');
        //         });
        //     } else {
        //         resp.json().then(json=>{
        //             this.context.updateMessage(json.apierror.message,'error');
        //         });
        //     }
        // })
        // .catch(err =>{
        //     console.log(err.message);
        //     this.context.updateMessage(err.message,'error');
        // });
        
    }
    handleChange(event){
        const newData=this.state.user;
        newData[event.target.id] = event.currentTarget.value;
        this.setState({user:newData});
        // ##############check userid should not be duplicate ###############
        // var data = JSON.parse(json.toString());  //parse the JSON
        // data.users.push({        //add the employee
        //     firstName:"Mike",
        //     lastName:"Rut",
        //     time:"10:00 am",
        //     email:"rut@bah.com",
        //     phone:"800-888-8888",
        //     image:"images/mike.jpg"
        // });
        // var txt = JSON.stringify(data);  //reserialize to JSON
        // console.log(txt);
        // var results = [];
        // var searchField = "userName";
        // var searchVal = "test Name";
        // for (var i=0 ; i < txt.users.length ; i++)
        // {
        //     if (txt.list[i][searchField] === searchVal) {
        //         results.push(txt.list[i]);
        //     }
        // }

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
    updateMessage: PropTypes.func.isRequired,
};
 

 
//code source: https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
