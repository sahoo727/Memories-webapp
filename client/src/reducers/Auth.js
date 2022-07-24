import { AUTH, LOGOUT} from "../constants/actionTypes";

const authReducer = (state = {authData:null} , action) => {
    switch(action.type){
        case AUTH:
            // console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}));                 //here we wre setting up item called profile with the userdata recived. localStorage is used so that even after page is refreshed the data(login info) of profile does gets removed
            return {...state, authData:action?.data};

        case LOGOUT:
            localStorage.clear();
            return {...state, authData:null};
            
        default:
            return state;
    }
}

export default authReducer;