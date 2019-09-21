import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Layout, Button, Input, withStyles, } from 'react-native-ui-kitten';
import { Appbar, Snackbar } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TextStyle from '../contantes/TextStyles';
import ButtonOutLine from '../componentes/ButtonOutLine';

import { connect } from 'react-redux';
import { QueLlevamos } from '../actions';

var { height, width } = Dimensions.get('window');

class QueBuscamos extends Component {
  state = {
    imagen: '',
    articulo: '',
    error: {
      state: false,
      msg: '',
    }
  };

  seleccionarImagen = () => {
    var options = {
      title: 'Seleccionar una imagen',
      customButtons: [{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' },],
      storageOptions: { skipBackup: true, path: 'images',},
    };
    ImagePicker.launchImageLibrary(options, (response) => {
        let source = response;
        this.setState({ imagen: source });
    });
  };

  componentDidMount() {
    const pedido = this.props.pedido
    if (!pedido) return;
    if (!pedido.text && pedido.text != null) this.setState({ articulo: pedido.text })
    if (!pedido.img && pedido.img != null) this.setState({ imagen: pedido.img })
  }

  mostrarError = (msg) => {
    this.setState({ error: { state: true, msg } })
  }

  validarCampos = () => {
    if (!this.state.imagen && !this.state.articulo) {
      this.mostrarError('Subir imagen o una descripción del articulo')
      return false;
    }
    return true
  }

  onPressContinuar = () => {
    console.log(this.props)
    if (!this.validarCampos()) return;
    this.props.QueLlevamos({
      img: this.state.imagen,
      text: this.state.articulo
    })

    //CONTINUAR SIGUIENTE VENTANA
  }

  renderHeader = (theme) => {
    return <Appbar.Header style={{ backgroundColor: '#2B82BF' }}>
      <Appbar.Content title={'¿Que quieres que busquemos?'} />
    </Appbar.Header>
  }

  renderImagen = () => {
    if (this.state.imagen == '') return;
    return (
      <View style={{width:'95%', backgroundColor:'transparent'}} >
        <Image
          source={{ uri: this.state.imagen.uri }}
          style={{ width: '100%', height: 300, borderRadius: 5, marginTop: 5 }}
        />
        <TouchableOpacity 
          style={{backgroundColor:'rgba(183,183,183,0.5)', alignItems:'center', justifyContent:'center', width:40, height:40, borderRadius:90 ,position:'absolute', alignSelf:'flex-end', marginTop:5}}
          onPress={()=> this.borrarImagen()}
        >
          <Icon name='close' size={30} color='white' />
        </TouchableOpacity>

      </View>
    );
  }

  borrarImagen = () => {
    this.setState({ imagen: '' })
  }

  render() {
    const { themedStyle } = this.props;
    return (
      <View style={{ flex: 1, }}>
        {this.renderHeader(themedStyle)}
        <ScrollView style={{ flex: 1, alignSelf: 'center', width: '95%', paddingVertical: 5 }}>
          {/* <Text category='h5' style={{ paddingBottom: 5 }}>+ Que quieres que busquemos?</Text> */}

          <Layout style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', }}>
            <ButtonOutLine onPressButton={() => this.seleccionarImagen()} texto='Subí una imagen' icono='photo' onPress></ButtonOutLine>
            {this.renderImagen()}
            <Input
              value={this.state.articulo}
              onChangeText={(value) => this.setState({ articulo: value })}
              style={{ width: '95%', alignSelf: 'center', marginTop: 5 }}
              numberOfLines={5}
              textAlignVertical='top'
              multiline={true}
              placeholder='Si no tienes una foto escribinos...' />
          </Layout>

          <Button onPress={() => this.onPressContinuar()} appearance='filled' status='danger' size='giant' style={{ width: '95%', alignSelf: 'center' }}>Continuar</Button>

        </ScrollView>
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