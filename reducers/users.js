export default function (state = null, action) {
    switch (action.type) {
        case 'GET_USERS':
            return action.users
        default:
            return state;
    }
}