import { combineReducers } from 'redux';

import {PedidoReducer} from './PedidoReducer'
import {LugarBusquedaReducer} from './DondeBuscamos'
import {FormaPagoReducer} from './ComoPagamos'

export default combineReducers({
    Pedido: PedidoReducer,
    DondeBuscamos: LugarBusquedaReducer,
    Pago: FormaPagoReducer,
});