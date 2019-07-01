import React, {Component} from 'react';
import './Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer-wrapper">
                <div className="contact-wrapper"> 
                    <div className="img-phone img"></div>
                    <a className="text-phone text" href="tel:+38(XXX)-XXX-XXXX">+38(XXX)-XXX-XXXX</a>
                </div>
    
                <div className="contact-wrapper">
                    <div className="img-email img"></div>
                    <a className="text-email text" href="mailto:xxxxxxxx@gmail.com">xxxxxxxx@gmail.com</a>
                </div>
    
                <div className="contact-wrapper">
                    <div className="img-address img"></div>
                    <p className="text-address text">Ukraine, Kharkov</p>
                </div>
            </div>
        );
    } 
};

export default Footer;