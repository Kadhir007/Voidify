import { createStore } from 'redux';

import reducer from "./songReducer";

const store=createStore(reducer);
export default store;