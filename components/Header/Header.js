import React from 'react';
import './Header.scss';
import {Link} from "react-router-dom";


const Headers = ((props) => {
    return (
        <div className="header-wrapper">
            <Link to={props.routerOneBtn} className="link"><button className="btn">{props.oneBtnTitle}</button></Link>
            Shop
            <Link to={props.routerTwoBtn} className="link"><button className="btn">{props.twoBtnTitle}</button></Link>
        </div>
    );
});

export default Headers;