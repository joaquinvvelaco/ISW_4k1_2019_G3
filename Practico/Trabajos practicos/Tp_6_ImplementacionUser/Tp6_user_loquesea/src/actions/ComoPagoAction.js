export const ComoPagamos = (
    numero,
    cvc,
    nombre,
    apellido,
    mes,
    ano,
    seleccionarEfectivo,
    monto) => {
    return {
        type: 'FORMA_PAGO',
        payload: {
            numero,
            cvc,
            nombre,
            apellido,
            mes,
            ano,
            seleccionarEfectivo,
            monto,
        }
    }
}