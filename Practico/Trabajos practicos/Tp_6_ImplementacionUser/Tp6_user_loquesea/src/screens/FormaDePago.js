import React, { Component } from 'react'

import {
    View,
    ScrollView,
    Dimensions,
} from 'react-native';

import {
    Layout,
    Button,
    withStyles,
    Input,
    Text
} from 'react-native-ui-kitten';

import TextStyle from '../contantes/TextStyles';
import ButtonOutLine from '../componentes/ButtonOutLine';
import { Appbar, Snackbar } from 'react-native-paper';
import FormPagoTarjeta from '../componentes/FormPagoTarjeta';

import { connect } from 'react-redux';
import { ComoPagamos } from '../actions';

var { height, width } = Dimensions.get('window');

class FormaDePago extends Component {

    state = {
        efectivo: '',
        numero: '',
        cvc: '',
        nombre: '',
        apellido: '',
        vencimiento: '',
        mes: '',
        ano: '',
        seleccionarEfectivo: '',
        monto: '',
        error: {
            state: false,
            msg: '',
        }
    }

    validarCampos = () => {
        console.log(this.state)
        if (this.state.monto == '' || this.state.monto < 0) {
            this.mostrarError('Ingrese un monto valido porfavor')
            return false;
        }
        if (this.state.seleccionarEfectivo == true) {
            return true;
        } else {
            const tarjeta = this.state
            if (tarjeta.nombre == '') {
                this.mostrarError('Ingrese el nombre del titular');
                return false;
            }
            if (tarjeta.apellido == '') {
                this.mostrarError('Ingrese el apellido del titular');
                return false;
            }
            if (tarjeta.numero == '') {
                this.mostrarError('Ingrese el numero de tarjeta')
                return false;
            }
            let regex = /^4[0-9]{12}(?:[0-9]{3})?$/
            if (!regex.test(this.state.numero)) {
                this.mostrarError('Ingrese un numero de tarjeta valido');
                return false;
            }
            //Falta poner regex de validacion de mastercard
            if (tarjeta.cvc == '') {
                this.mostrarError('Ingrese el numero de clave (cvc)');
                return false;
            }
            if (tarjeta.mes == '' || tarjeta.ano == '') {
                this.mostrarError('Ingrese una fecha de vencimiento')
                return false;
            }
            if (tarjeta.mes < 0 || tarjeta.mes > 12 || tarjeta.ano < 2019 || (tarjeta.mes <= 9 && tarjeta.ano <= 2019)) {
                this.mostrarError('Ingrese una fecha de vencimiento valida')
                return false;
            }

        }
        return true
    }

    mostrarError = (msg) => {
        this.setState({ error: { state: true, msg } })
    }

    componentDidMount() {
        const pago = this.props.pago;
        if (pago.monto == '' || !pago.monto) return;
        this.setState({
            numero: pago.numero,
            cvc: pago.cvc,
            nombre: pago.nombre,
            apellido: pago.apellido,
            mes: pago.mes,
            ano: pago.ano,
            seleccionarEfectivo: pago.seleccionarEfectivo,
            monto: pago.monto,
        })
    }

    onPressContinuar = () => {
        console.log('entre al onpress')
        if (!this.validarCampos()) return
        const state = this.state
        const numero = state.numero
        const cvc = state.cvc
        const nombre = state.nombre
        const apellido = state.apellido
        const mes = state.mes
        const ano = state.ano
        const seleccionarEfectivo = state.seleccionarEfectivo
        const monto = state.monto
        this.props.ComoPagamos(
            numero,
            cvc,
            nombre,
            apellido,
            mes,
            ano,
            seleccionarEfectivo,
            monto
        )
        this.props.navigation.navigate('PedidoEnviado');
    }

    renderHeader = () => {
        return <Appbar.Header style={{ backgroundColor: '#2B82BF' }}>
            <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
            <Appbar.Content title={'¿Como queres pagar tu pedido?'} />
        </Appbar.Header>
    }

    renderPagoTarjeta = () => {
        if (this.state.seleccionarEfectivo) return
        return (
            <View style={{ width: '95%', marginVertical: 5 }}>
                <FormPagoTarjeta
                    numero={this.state.numero}
                    onChangeNumeroTarjeta={(numero) => this.setState({ numero })}
                    cvc={this.state.cvc}
                    onChangeCVC={(cvc) => this.setState({ cvc })}
                    nombre={this.state.nombre}
                    onChangeNombre={(nombre) => this.setState({ nombre })}
                    apellido={this.state.apellido}
                    onChangeApellido={(apellido) => this.setState({ apellido })}
                    vencimiento={this.state.vencimiento}
                    onChangeVencimiento={(vencimiento) => this.setState({ vencimiento })}
                    mes={this.state.mes}
                    onChangeMes={(mes) => this.setState({ mes })}
                    ano={this.state.ano}
                    onChangeAno={(ano) => this.setState({ ano })}
                />
            </View>
        );
    }

    renderPagoEfectivo = (themedStyle) => {
        if (!this.state.seleccionarEfectivo) return
        return (
            <View style={{ width: '95%', marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[themedStyle.welcomeLabel, { color: 'black', width: '100%', }]}>
                    Muy bien, pagaras contraentrega!
                </Text>
            </View>
        );
    }

    render() {
        const { themedStyle } = this.props;
        return (
            <View>
                {this.renderHeader()}
                <ScrollView>
                    <Layout style={{ flex: 1 }}>
                        <Layout style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <Layout style={{ width: '35%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 5 }}>
                                <Input
                                    textStyle={{ textAlign: 'center' }}
                                    placeholder='Total a pagar'
                                    keyboardType='numeric'
                                    value={this.state.monto}
                                    onChangeText={(value) => this.setState({ monto: value })}
                                />
                            </Layout>
                            <Layout style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 5 }}>
                                <ButtonOutLine texto='Efectivo' icono='dollar' onPressButton={() => this.setState({ seleccionarEfectivo: true })}></ButtonOutLine>
                            </Layout>
                            {this.renderPagoEfectivo(themedStyle)}
                            <Layout style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <ButtonOutLine texto='Tarjeta' icono='credit-card' onPressButton={() => this.setState({ seleccionarEfectivo: false })}></ButtonOutLine>
                            </Layout>
                            {this.renderPagoTarjeta()}
                        </Layout>
                    </Layout>
                </ScrollView>

                <Button
                    onPress={() => this.onPressContinuar()}
                    appearance='filled'
                    status='danger'
                    size='giant'
                    style={{ width: '95%', alignSelf: 'center' }}
                >
                    Confirmar pedido
                </Button>


                <Snackbar
                    visible={this.state.error.state}
                    onDismiss={() => this.setState({ error: { state: false } })}
                    style={{ backgroundColor: 'red', position: 'absolute' }}
                >
                    {this.state.error.msg}
                </Snackbar>
            </View>
        );
    }
}

FormaDePago.navigationOptions = {
    header: null,
};

const screen = withStyles(FormaDePago, (theme) => {
    return ({
        welcomeContainer: {
            flex: 3,
            //flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['background-primary-color-1']
        },
        buttonContainer: {
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: width * 0.05,
            paddingVertical: height * 0.02,
            backgroundColor: theme['background-basic-color-2']
        },
        helperTextContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: theme['background-basic-color-2'],
            alignSelf: 'stretch',
            //marginBottom: height * 0.02
        },
        button: {
            backgroundColor: theme['color-danger-600'],
        },
        welcomeLabel: {
            color: theme['text-control-color'],
            marginVertical: height * 0.02,
            //marginTop: height * 0.05,
            ...TextStyle.headline,
            fontWeight: 'bold',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'

        },
        nameLabel: {
            color: theme['text-control-color'],
            alignSelf: 'center',
            //marginTop: height * 0.05,
            ...TextStyle.headline,
            textAlign: 'center'
        },
        helperText: {
            color: theme['text-hint-color'],
            ...TextStyle.subtitle,
        },
        appBarContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            background: theme['color-danger-100']
        },
    });
})

const mapStateToProps = state => {
    return { pago: state.Pago };
}

export default connect(mapStateToProps, { ComoPagamos })(screen);