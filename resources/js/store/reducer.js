const initialState = { count: 42 };

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
function prueba(state = initialState, action) {
    if(action.type=='INCREMENT'){
        return{
            count: state.count+action.payload
        };
    }
    else if(action.type=='DECREMENT'){
        return{
            count: state.count-1
        };
    }
    else{
        return state;
    }
};
export default prueba;

