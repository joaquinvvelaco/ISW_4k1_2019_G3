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

import ButtonOutLine from '../componentes/ButtonOutLine'

export default class Menu extends Component {
    render() {
        return (
            <View>
                <Text>Buen dia, vista en construccion</Text>
                <Button
                    onPress={() =>  this.props.navigation.navigate('QueBuscamos')}
                    appearance='filled'
                    status='danger'
                    size='giant'
                    style={{ width: '95%', alignSelf: 'center' }}
                >
                    Enviar lo que sea!
                </Button>
            </View>
        );
    }
}