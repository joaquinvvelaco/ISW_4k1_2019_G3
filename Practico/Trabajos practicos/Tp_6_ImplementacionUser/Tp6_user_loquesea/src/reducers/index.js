import { combineReducers } from 'redux';

import {PedidoReducer} from './PedidoReducer'
import {LugarBusquedaReducer} from './DondeBuscamos'

export default combineReducers({
    Pedido: PedidoReducer,
    DondeBuscamos: LugarBusquedaReducer
});