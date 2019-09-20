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
    withStyles,
} from 'react-native-ui-kitten';

import TextStyle from '../contantes/TextStyles';
import FormDireccion from '../componentes/FormDireccion';
import ButtonOutLine from '../componentes/ButtonOutLine';
import { Appbar, Snackbar } from 'react-native-paper';

var { height, width } = Dimensions.get('window');

class DondeEntregamos extends Component {
    state = {
        ubicación: {
            calle: '',
            numero: '',
            ciudad: '',
        },
        comentario: '',
        error: {
            state: false,
            msg: '',
        }
    }

    validarCampos = () => {
        if (!this.state.ubicación.calle) {
            this.mostrarError('Ingresa la calle');
            return false;
        }
        if (this.state.ubicación.ciudad) {
            this.mostrarError('Ingresa la ciudad');
            return false;
        }
        if (this.state.ubicación.numero) {
            this.mostrarError('Ingresa el numero de dirección');
            return false;
        }
        return true
    }

    setStateCalle = (calle) => { this.setState({ ubicación: { calle } }) }
    setStateNumero = (num) => { this.setState({ ubicación: { numero: num } }) }
    setStateCiudad = (ciudad) => { this.setState({ ubicación: { ciudad } }) }
    setStateComentario = (comentario) => { this.setState({ comentario }) }

    onPressContinuar = () => {

    }

    renderHeader = () => {
        return <Appbar.Header style={{ backgroundColor: '#2B82BF' }}>
            <Appbar.Content title={'¿Donde entregamos tu pedido?'} />
        </Appbar.Header>
    }

    render() {
        const { themedStyle } = this.props;
        return (
            <View>
                {this.renderHeader()}
                <ScrollView>
                    {/* <Text category='h5' style={{ paddingBottom: 5 }}>+ Donde entregamos tu pedido?</Text> */}

                    <Layout style={{ flex: 1, }}>
                        <Layout style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={[themedStyle.welcomeLabel, { color: 'black', width: '95%', }]}>Selecciona la ubicación en el mapa:</Text>
                            <ButtonOutLine texto='Ir a google maps' icono='map'></ButtonOutLine>
                        </Layout>

                        <Layout style={{ width: '95%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', paddingTop: 5 }}>
                            <Text style={[themedStyle.welcomeLabel, { color: 'black', width: '100%' }]}>O indicanos la dirección:</Text>
                            <FormDireccion
                                calle={this.state.ubicación.calle}
                                onChangeCalle={this.setStateCalle}
                                numero={this.state.ubicación.numero}
                                onChangeNumero={this.setStateNumero}
                                ciudad={this.state.ubicación.ciudad}
                                onChangeCiudad={this.setStateCiudad}
                                comentario={this.state.comentario}
                                onChangeComentario={this.setStateComentario}
                            />
                        </Layout>
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

export default withStyles(DondeEntregamos, (theme) => {
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