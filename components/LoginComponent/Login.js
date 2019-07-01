import React, {Component} from 'react';
import Header from '../../Header/Header';
import Content from './Content/Content';
import Footer from '../../Footer/Footer'

class Login extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <>
                <Header routerOneBtn={"/"} oneBtnTitle={"Main"} routerTwoBtn={"/register"} twoBtnTitle={"Sign up"} />
                <Content {...this.props}/>
                <Footer/>
            </>  
        );
    }
};

export default Login;