function loginReducer(state = false, action) {
    if(action.type=='LOGEADO'){
        return true;
    }
    else if(action.type=='DESLOGEADO'){
            return false;
    }
    else{
        return state;
    }
};
export default loginReducer;

