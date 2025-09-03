import initialState from "./initialState";

 const reducerfn= (state=initialState, action)=>{
switch(action.type){
    case "product-added": return {
        ...state,
        cart:{
            ...state.cart,
            productCount: state.cart.productCount+1
        }
    }
    default : return state;
}
 }

 export default reducerfn