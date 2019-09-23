import React, { Component } from 'react'

import {
    View,
    Image,
    Dimensions,
} from 'react-native';

import {
    Layout,
    Button,
    withStyles,
    Input,
    Text
} from 'react-native-ui-kitten';

import ButtonOutLine from '../componentes/ButtonOutLine'

export default class PedidoEnviado extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems:'stretch' }}>
                <Text>Buen dia, vista en construccion</Text>
                <Image
                    source={require('../assets/foto.png')}
                    style={{ width: '100%', height: 300, borderRadius: 5, marginTop: 5 }}
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Menu')}
                    appearance='filled'
                    status='danger'
                    size='giant'
                    style={{ width: '95%', alignSelf: 'center' }}
                >
                    Hacer otro pedido!
                </Button>
            </View>
        );
    }
}