export const LugarBusquedaReducer = (lugar = true, action) => {
    switch(action.type){
        case 'NUEVO_PEDIDO':
            return  action.payload;
        // case 'BORRAR_PEDIDO':
        default : return lugar
    }
}