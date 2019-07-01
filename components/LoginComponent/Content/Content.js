import React, { Component } from 'react';
import './Content.scss';
import "firebase/auth";
import firebase from "../../../testFirebaseoConfig"; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../../../../action/getUsers';

class Content extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            users: {},
            keyUser: '',
            errorEmailOrPassword: true,
            errors: {
                password: true,
                email: true
            }
        }
        this.style = {
            email: {borderColor: '#d8cece'},
            password: {borederColor: '#d8cece'}
        }
    }
    
    componentWillMount() {
        this.setState({
            users: this.props.users
        });
    }

    handleUserInput = ({ target }) => {
        const { name, value } = target;
        this.setState({[name]: value},() => this.validateField(name, value));
    }
    
    validateField(fieldName) {
        this.setState({
            errorEmailOrPassword: true
        })
        const errors = {...this.state.errors};
        const {password, email, rePassword} = this.state;
        switch(fieldName) {
            case 'email':
                if (!(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
                    errors.email = false;
                } else {
                    errors.email = true;
                }     
            break;
            case 'password':
                if (!(password.match(/(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) && !/\s/g.test(password))) {
                    errors.password = false;
                } else {
                    errors.password = true;
                }
            break;
        }
        this.setState({errors});
    }

    singInGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // let token = result.credential.accessToken;
            const { users } = this.state;
            let user = result.user;
            const test = firebase.database().ref('/users');
            for(let key in users) {
                console.log('open')
                if (users[key].user.email === user.email) {
                    console.log('open EMAIL')
                    localStorage.setItem('user', JSON.stringify(
                        {
                        Email: user.email,
                        userKey: key,
                        basket: users[key].basketItem,
                        price: users[key].price
                    }
                    ));
                   
                    this.props.history.push("/shop")
                } 
            }
            if(!JSON.parse(localStorage.getItem('user'))) {
                console.log('open new user')
                test.push().set({
                    price: 0,
                    user: {
                    email: user.email
                    }
                }).then(() => {
                    test.on("child_added", snapshot => {
                        console.log(snapshot)
                        localStorage.setItem('user', JSON.stringify({
                            Email: user.email,
                            userKey: snapshot.val().key,
                            basket: [],
                            price: 0
                        }));
                    })
                });
                const firebaseDatabase = firebase.database().ref();
                firebaseDatabase.on("child_added", snapshot => {
                  this.props.getUsers(snapshot.val())
                });
                this.props.history.push("/shop")
            }
            // this.props.history.push("/shop")
          }).catch((error) => {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // var email = error.email;
            // var credential = error.credential;
          });
    }

    signIn = () => {
        const { users, email, password } = this.state;
        const test = firebase.database().ref();
        test.on("child_added", snapshot => {
            for(let key in snapshot.val()) {
                if(snapshot.val()[key].user.email === email && snapshot.val()[key].user.password === password) {
                    let userObj = {
                        Email: email,
                        userKey: key,
                        basket: snapshot.val()[key].basketItem,
                        price: snapshot.val()[key].price
                    }
                    localStorage.setItem('user', JSON.stringify(userObj));
                    this.props.history.push("/shop")
                } else {
                    this.setState({
                        errorEmailOrPassword: false
                    })
                }
            }
        });
    }
    
    render() {
        const { email, password, errorEmailOrPassword, errors } = this.state;
        return (
            <div className="content-wrapper">
                <div className="wrapper-login">
                    <div className="wrapper-input">
                        <input 
                        placeholder="Enter email" 
                        type="email" 
                        name="email" 
                        className="input"
                        style={{...this.style.email, borderColor: errors.email ? '#d8cece' : 'red'}}
                        value={email}
                        onClick={this.handleUserInput}
                        onBlur={this.handleUserInput}
                        onChange={this.handleUserInput} />

                        <input 
                        placeholder={"Enter password"}
                        type={"password"} 
                        name={"password"}  
                        className={"input"}
                        style={{...this.style.password, borderColor: errors.password ? '#d8cece' : 'red'}}
                        value={password}
                        onClick={this.handleUserInput}
                        onBlur={this.handleUserInput}
                        onChange={this.handleUserInput}/>
                    </div>
                    <div hidden={errorEmailOrPassword} className="error">Password or email is not valid.</div>
                    <div className="wrapper-btn">
                        <button 
                        onClick={this.singInGoogle}
                        type="submit"
                        className="btn">Sign in Google</button>

                        <button 
                        onClick={this.signIn}
                        type="submit"
                        className="btn">Sign in</button>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps (state) {
    return {
        users: state.users
    };
}
function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        getUsers: getUsers
    }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( Content );