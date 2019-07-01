import {combineReducers} from 'redux';
import users from './users';
import stock from './stoke';
import basketItem from './ItemBasket';
import isCardOpen from './isCardOpen'
import moreItem from './moreItem';


const reducers = combineReducers ({
    stock,
    basketItem,
    isCardOpen,
    users,
    moreItem
});

export default reducers;
