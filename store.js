import {createStore} from 'redux'


const counterReducer = (state={video:{}}, action) => {
    if (action.type === 'setVideo') {
        return {
           video: action.video
        }
        
    }


    return state;
}

const Store = createStore(counterReducer);

export default Store;