import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Layout, Button, Input, Text, withStyles, } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextStyle from '../contantes/TextStyles';
import FormDireccion from '../componentes/FormDireccion';
import ButtonOutLine from '../componentes/ButtonOutLine';
import { Appbar, Snackbar } from 'react-native-paper';
import * as Colors from '../contantes/Colors';

import { connect } from 'react-redux';
import {QueLlevamos} from '../actions'

var { height, width } = Dimensions.get('window');

class QueBuscamos extends Component {
  state = {
    imagen:false,
    articulo:'',
    error:{
      state:false,
      msg: '',
    }
  };

  componentDidMount(){
    const pedido = this.props.pedido
    //console.log(this.props)

    if(!pedido)return;
    if(!pedido.text && pedido.text != null) this.setState({articulo: pedido.text})
    if(!pedido.img && pedido.img != null) this.setState({imagen: pedido.img})
  }

  mostrarError = (msg) => {
    this.setState({error:{state:true, msg}})
  }

  validarCampos = () => {
    if(!this.state.imagen && !this.state.articulo) {
      this.mostrarError('Subir imagen o una descripción del articulo')
      return false;
    }
    return true
  }

  onPressContinuar = () => {
    console.log(this.props)
    if(!this.validarCampos())return;
    this.props.QueLlevamos({
      img:this.state.imagen, 
      text: this.state.articulo
    })
    
    //CONTINUAR SIGUIENTE VENTANA
  }

  renderHeader = (theme) => {
    return <Appbar.Header style={{ backgroundColor: '#2B82BF' }}>
      <Appbar.Content title={'¿Que quieres que busquemos?'} />
    </Appbar.Header>
  }

  render() {
    const { themedStyle } = this.props;
    return (
      <View style={{ flex: 1, }}>
        {this.renderHeader(themedStyle)}
        <ScrollView style={{ flex: 1, alignSelf: 'center', width: '95%', paddingVertical: 5 }}>
        {/* <Text category='h5' style={{ paddingBottom: 5 }}>+ Que quieres que busquemos?</Text> */}

          <Layout style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', }}>
            <ButtonOutLine texto='Subí una imagen' icono='photo'></ButtonOutLine>
            <Input 
              value={this.state.articulo}
              onChangeText={(value) => this.setState({articulo:value})}
              style={{ width: '95%', alignSelf: 'center', marginTop: 5 }} 
              numberOfLines={5} 
              textAlignVertical='top' 
              multiline={true} 
              placeholder='Si no tienes una foto escribinos...'/>
          </Layout>

          <Button onPress={() => this.onPressContinuar()} appearance='filled' status='danger' size='giant' style={{ width: '95%', alignSelf: 'center' }}>Continuar</Button>

        </ScrollView>
        <Snackbar
          visible={this.state.error.state}
          onDismiss={() => this.setState({ error: {state:false} })}
          style={{backgroundColor:'red',}}
        >
          {this.state.error.msg}
        </Snackbar>
      </View>
    );
  }
};



const screen = withStyles(QueBuscamos, (theme) => {
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
  return { pedido: state.Pedido };
}

export default connect(mapStateToProps, { QueLlevamos })(screen);