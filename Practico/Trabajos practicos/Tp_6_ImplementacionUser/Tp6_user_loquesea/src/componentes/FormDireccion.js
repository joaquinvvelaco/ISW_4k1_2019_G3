import React, { Component } from 'react';
import { Layout, Text, Input } from 'react-native-ui-kitten';
import { View, Picker } from 'react-native'

export default FormDireccion = (props) => {
    console.log('----------------')
    console.log(props)

    state = { language: 'arguello' }

    return (
        <Layout style={{ paddingVertical: 5 }}>
            <Layout style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Input
                    style={{ width: '70%', paddingRight: 5 }}
                    placeholder='Calle'
                    value={props.calle}
                    onChangeText={(value) => props.onChangeCalle(value)}
                />
                <Input
                    style={{ width: '30%', }}
                    placeholder='N°'
                    value={props.numero}
                    keyboardType='numeric'
                    onChangeText={(num) => props.onChangeNumero(num)}
                />
            </Layout>
            <Input
                style={{ width: '100%' }}
                placeholder='Ciudad'
                value={props.ciudad}
                onChangeText={(value) => props.onChangeCiudad(value)}
            />
            <Input
                style={{ width: '100%' }}
                placeholder='Comentario'
                value={props.comentario}
                onChangeText={(value) => props.onChangeComentario(value)}
            />
        </Layout>
    );
}