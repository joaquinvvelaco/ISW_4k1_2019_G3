export const PedidoReducer = (pedido = {text:'', img: ''}, action) => {
    switch(action.type){
        case 'NUEVO_PEDIDO':
            return  action.payload;
        // case 'BORRAR_PEDIDO':
        default : return pedido
    }
}
