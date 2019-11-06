export const FormaPagoReducer = (state = {
    numero: '',
    cvc: '',
    nombre: '',
    apellido: '',
    mes: '',
    ano: '',
    seleccionarEfectivo: '',
    monto: '',
}, action) => {
    switch (action.type) {
        case 'FORMA_PAGO':
            return action.payload;
        case 'BORRAR_PEDIDO':
            return {
                numero: '',
                cvc: '',
                nombre: '',
                apellido: '',
                mes: '',
                ano: '',
                seleccionarEfectivo: '',
                monto: '',
            }
        default: return state
    }
}