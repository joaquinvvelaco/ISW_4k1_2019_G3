import React, { Component } from 'react'
import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Button, Text, withStyles } from 'react-native-ui-kitten';
import { Appbar, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextStyle from '../contantes/TextStyles';
import FormDireccion from '../componentes/FormDireccion';
import ButtonOutLine from '../componentes/ButtonOutLine';
import { DondeBuscamos as DondeBuscamosAction } from '../actions'
import PickerCiudad from '../componentes/Picker'
import Mapa from '../componentes/Mapa'
import GetLocation from '../componentes/GetLocation'

var { height, width } = Dimensions.get('window');

class DondeBuscamos extends Component {
    constructor(props) {
        super(props);

        this.map;


    }
    state = {
        calle: '',
        numero: '',
        ciudad: '',
        comentario: '',
        error: {
            state: false,
            msg: '',
        },
        actualLocation: { longitude: -64.269660, latitude: -31.349530, },
        seleccionarMapa: false,
    }


    componentDidMount() {
        const { calle, numero, ciudad, comentario } = this.props.lugar
        if (
            calle == '' ||
            numero == '' ||
            ciudad == '' ||
            comentario == ''
        ) return;

        this.setState({
            calle,
            numero,
            ciudad,
            comentario,
        });
    }

    validarCampos = () => {
        if(this.state.seleccionarMapa)return true;
        if (!this.state.calle) {
            this.mostrarError('Ingresa la calle');
            return false;
        }
        if (!this.state.ciudad) {
            this.mostrarError('Ingresa la ciudad');
            return false;
        }
        if (!this.state.numero) {
            this.mostrarError('Ingresa el numero de dirección');
            return false;
        }
        return true
    }
    mostrarError = (msg) => {
        this.setState({ error: { state: true, msg } })
    }

    setStateCalle = (calle) => { this.setState({ calle }) }
    setStateNumero = (numero) => { this.setState({ numero }) }
    setStateCiudad = (ciudad) => { this.setState({ ciudad }) }
    setStateComentario = (comentario) => { this.setState({ comentario }) }

    onPressContinuar = () => {
        if (!this.validarCampos()) return;
        const { calle, numero, ciudad, comentario } = this.state
        this.props.DondeBuscamosAction(calle, numero, ciudad, comentario)
        console.log(this.props)
        this.props.navigation.navigate('DondeEntregamos');
    }

    renderHeader = () => {
        return <Appbar.Header style={{ backgroundColor: '#2B82BF' }}>
            <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
            <Appbar.Content title={'¿Donde retiramos tu pedido?'} />
        </Appbar.Header>
    }

    updateLocation = (location) => {
        console.log(this.connection);
        if (this.connection === undefined || this.connection.state === signalR.HubConnectionState.Disconnected) {
            return;
        }
        this.connection.send("UpdateLocation", this.props.evento.eventoId, { latitude: location.latitude, longitude: location.longitude });
        this.setState(prevState => ({
            previousLocations: [...prevState.previousLocations, prevState.actualLocation],
            actualLocation: location
        }));
        this.map.onUpdateLocation(location);
    }

    renderSinMapa = (themedStyle) => {
        return (
            <ScrollView>
                <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                </View>
                <Layout style={{ flex: 1, }}>
                    <Layout style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 5 }}>
                        <Text style={[themedStyle.welcomeLabel, { color: 'black', width: '95%', }]}>Selecciona la ubicación en el mapa:</Text>
                        <ButtonOutLine texto='Abrir google maps' icono='map' onPressButton={() => this.setState({ seleccionarMapa: true })}></ButtonOutLine>
                    </Layout>

                    <Layout style={{ width: '95%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', paddingTop: 5 }}>
                        <Text style={[themedStyle.welcomeLabel, { color: 'black', width: '100%' }]}>O indicanos la dirección:</Text>
                        <FormDireccion
                            calle={this.state.calle}
                            onChangeCalle={(calle) => this.setStateCalle(calle)}
                            numero={this.state.numero}
                            onChangeNumero={(numero) => this.setStateNumero(numero)}
                            ciudad={this.state.ciudad}
                            onChangeCiudad={(ciudad) => this.setStateCiudad(ciudad)}
                            comentario={this.state.comentario}
                            onChangeComentario={(comentario) => this.setStateComentario(comentario)}
                        />
                    </Layout>
                </Layout>
            </ScrollView>
        );
    }

    renderMapa = () => {
        return (
            <View style={{ width: '100%', height: '85%', borderRadius: 5, alignSelf: 'center', }}>

                <GetLocation updateLocation={this.updateLocation} />
                <Mapa
                    style={{ flex: 1, }}
                    ref={map => this.map = map}
                    ubicacionAmigo={this.state.actualLocation}
                />
                <TouchableOpacity
                    style={{ backgroundColor: 'rgba(183,183,183,0.5)', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 90, position: 'absolute', alignSelf: 'flex-end', marginTop: 5 }}
                    onPress={() => this.setState({ seleccionarMapa: false })}
                >
                    <Icon name='close' size={30} color='white' />
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        console.log(this.props)
        const { themedStyle } = this.props;
        return (
            <View>
                {this.renderHeader()}
                {this.state.seleccionarMapa ? this.renderMapa() : this.renderSinMapa(themedStyle)}
                <Button onPress={() => this.onPressContinuar()} appearance='filled' status='danger' size='giant' style={{ width: '95%', alignSelf: 'center' }}>Continuar</Button>
                <Snackbar
                    visible={this.state.error.state}
                    onDismiss={() => this.setState({ error: { state: false } })}
                    style={{ backgroundColor: 'red', position:'absolute' }}
                >
                    {this.state.error.msg}
                </Snackbar>
            </View>
        );
    }
}

DondeBuscamos.navigationOptions = {
    header: null,
};

const screen = withStyles(DondeBuscamos, (theme) => {
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

const mapStateToProps = state => {
    return { lugar: state.DondeBuscamos };
}

export default connect(mapStateToProps, { DondeBuscamosAction })(screen);