export const DondeBuscamos = (calle, numero, ciudad, comentario) => {
    return {
        type: 'DONDE_BUSCAMOS',
        payload: { calle, numero, ciudad, comentario }
    }
}

export const BorrarLugarBusqueda = () => {
    return {
        type: 'BORRAR_LUGAR_BUSQUEDA'
    }
}