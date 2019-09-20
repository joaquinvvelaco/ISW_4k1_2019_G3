import React, { Component } from 'react'

import {
    View,
    ScrollView,
    Dimensions,
} from 'react-native';

import {
    Layout,
    Button,
    Text,
    RadioGroup,
    Radio,
    withStyles,
    Input,
} from 'react-native-ui-kitten';

import TextStyle from '../contantes/TextStyles';
import FormDireccion from '../componentes/FormDireccion';
import ButtonOutLine from '../componentes/ButtonOutLine';
import { Appbar, Snackbar } from 'react-native-paper';

var { height, width } = Dimensions.get('window');

class FormaDePago extends Component {

    state = {
        radioGroup: 1,
        efectivo: '',
        tarjeta: {
            numero: '',
            cvc: '',
            nombre: '',
            apellido: '',
        },

        error: {
            state: false,
            msg: '',
        }
    }

    validarCampos = () => {
        if (radioGroup == 1) {
            if (this.state.efectivo == '') {
                this.mostrarError('Ingrese un monto valido porfavor')

                return false;
            }
        }
        if (radioGroup == 2) {
            const tarjeta = this.state.tarjeta
            if (tarjeta.numero == '') {
                this.mostrarError('Ingrese el numero de tarjeta')
                return false;
            }
            //Falta poner regex de validacion de mastercard
            if (tarjeta.cvc == '') {
                this.mostrarError('Ingrese el numero de clave (cvc)');
                return false;
            }
            if (tarjeta.nombre == '') {
                this.mostrarError('Ingrese el nombre del titular');
                return false;
            }
            if (tarjeta.apellido == '') {
                this.mostrarError('Ingrese el apellido del titular');
                return false;
            }
        }
        return true
    }

    onPressContinuar = () => {

    }

    renderHeader = () => {
        return <Appbar.Header style={{ backgroundColor: '#2B82BF' }}>
            <Appbar.Content title={'¿Como queres pagar tu pedido?'} />
        </Appbar.Header>
    }

    render() {
        return (
            <View>
                {this.renderHeader()}
                <ScrollView>
                    <Layout style={{ flex: 1 }}>
                        <RadioGroup
                            style={{ width: '95%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', paddingTop: 5 }}
                            selectedIndex={indice => this.setState({ radioGroup: indice })}>
                            <Radio style={{ width: '100%' }} text='Efectivo' />
                            <Layout style={{ width: '100%' }}>
                                <Input
                                    value={this.state.efectivo}
                                    onChangeText={value => this.setState({ efectivo: value })}
                                    placeholder='Ingresa el monto a pagar' />
                            </Layout>

                            <Radio style={{ width: '100%' }} text='Tarjeta' />
                            <Layout style={{ width: '100%' }}>
                                <Layout >
                                    <Input
                                        // style={{width:'70%'}}
                                        status={this.state.radioGroup == 1 ? false : true}
                                        value={this.state.tarjeta.numero}
                                        onChangeText={numero => this.setState({ tarjeta: { numero } })}
                                    />
                                    <Input
                                        // style={{width:'30%'}}
                                        value={this.state.tarjeta.cvc}
                                        onChangeText={cvc => this.setState({ tarjeta: { cvc } })}
                                    />
                                </Layout>
                                <Input
                                    value={this.state.tarjeta.nombre}
                                    onChangeText={nombre => this.setState({ tarjeta: { nombre } })}
                                />
                                <Input
                                    value={this.state.tarjeta.apellido}
                                    onChangeText={apellido => this.setState({ tarjeta: { apellido } })}
                                />
                            </Layout>
                        </RadioGroup>
                    </Layout>
                </ScrollView>

                <Button onPress={() => this.onPressContinuar()} appearance='filled' status='danger' size='giant' style={{ width: '95%', alignSelf: 'center' }}>Continuar</Button>

                <Snackbar
                    visible={this.state.error.state}
                    onDismiss={() => this.setState({ error: { state: false } })}
                    style={{ backgroundColor: 'red', }}
                >
                    {this.state.error.msg}
                </Snackbar>
            </View>
        );
    }
}

export default withStyles(FormaDePago, (theme) => {
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
            marginBottom: height * 0.02,
            //marginTop: height * 0.05,
            ...TextStyle.headline,
            fontWeight: 'bold'

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