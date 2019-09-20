import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const color = '#2f95dc'

const ButtonOutLine = (props) => {
    return (
        <TouchableOpacity style={{ width: '95%', }}>
            <View style={{ backgroundColor:'#F7FCFF', borderColor: color, borderWidth: 1, flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderRadius: 3 }}>
                <Text style={{ color: '#2f95dc', marginRight:10 }}>{props.texto}</Text>
                <Icon name={props.icono} size={30} color={color}></Icon>
            </View>
        </TouchableOpacity>
    );
}

export default ButtonOutLine;