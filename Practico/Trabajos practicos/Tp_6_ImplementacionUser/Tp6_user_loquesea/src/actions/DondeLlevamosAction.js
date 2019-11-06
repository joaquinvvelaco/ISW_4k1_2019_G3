export const DondeLlevamos = (mensaje) => {
    return {
        type:'DONDE_LLEVAR',
        payload: mensaje
    }
}

export const BorrarLugar = () => {
    return {
        type: 'BORRAR_LUGAR'
    }
}