import React, { Component } from 'react';
import { Layout, Text, Input } from 'react-native-ui-kitten';
import { View, Picker } from 'react-native'

export default FormDireccion = (props) => {

    return (
        <Layout style={{ paddingVertical: 5 }}>
            <Layout style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Input
                    style={{ width: '50%', paddingRight: 5 }}
                    placeholder='Nombre'
                    value={props.nombre}
                    onChangeText={(value) => props.onChangeNombre(value)}
                />
                <Input
                    style={{ width: '50%', }}
                    placeholder='Apellido'
                    value={props.apellido}
                    onChangeText={(apellido) => props.onChangeApellido(apellido)}
                />
            </Layout>
            <Layout style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Input
                    style={{ width: '70%', paddingRight: 5 }}
                    placeholder='Numero de tarjeta'
                    keyboardType='numeric'
                    value={props.numero}
                    maxLength={16}
                    onChangeText={(value) => props.onChangeNumeroTarjeta(value)}
                />
                <Input
                    style={{ width: '30%', }}
                    placeholder='CVC'
                    value={props.cvc}
                    keyboardType='numeric'
                    onChangeText={(num) => props.onChangeCVC(num)}
                />
            </Layout>

            <Layout style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Input
                    style={{ width: '50%', paddingRight: 5 }}
                    placeholder='MM'
                    value={props.mes}
                    keyboardType='numeric'
                    maxLength={2}
                    onChangeText={(value) => props.onChangeMes(value)}
                />
                <Input
                    style={{ width: '50%' }}
                    placeholder='AAAA'
                    value={props.ano}
                    keyboardType='numeric'
                    maxLength={4}
                    onChangeText={(value) => props.onChangeAno(value)}
                />
            </Layout>
        </Layout>
    );
}