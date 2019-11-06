export const LugarBusquedaReducer = (lugar = {
    calle: '',
    numero: '',
    ciudad: '',
    comentario: '',
}, action) => {
    switch (action.type) {
        case 'NUEVO_PEDIDO':
            return action.payload;
        case 'BORRAR_PEDIDO':
            return {
                calle: '',
                numero: '',
                ciudad: '',
                comentario: '',
            }
        default: return lugar
    }
}