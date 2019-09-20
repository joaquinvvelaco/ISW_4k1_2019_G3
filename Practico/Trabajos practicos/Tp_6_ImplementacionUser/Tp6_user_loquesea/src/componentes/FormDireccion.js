import React, { Component } from 'react';
import { Layout, Text, Input, } from 'react-native-ui-kitten';

export default FormDireccion = (props) => {
    return (
        <Layout style={{paddingVertical:5}}>
            <Layout style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
                <Input style={{width:'70%', paddingRight:5}} placeholder='Calle'></Input>
                <Input style={{width:'30%',}} placeholder='N°'></Input>
            </Layout>
            <Input style={{width:'100%'}} placeholder='Ciudad' />
            <Input style={{width:'100%'}} placeholder='Comentario'/>
        </Layout>
    );
}