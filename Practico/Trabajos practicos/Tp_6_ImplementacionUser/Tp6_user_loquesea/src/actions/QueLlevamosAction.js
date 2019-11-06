export const QueLlevamos = (mensaje) => {
    return {
        type:'NUEVO_PEDIDO',
        payload: mensaje
    }
}

export const BorrarPedido = () => {
    return {
        type: 'BORRAR_PEDIDO'
    }
}