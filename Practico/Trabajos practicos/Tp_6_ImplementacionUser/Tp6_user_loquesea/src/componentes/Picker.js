import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Drawer } from 'react-native-paper';

export default class PickerCiudad extends Component {
    state = {
        visible: false,
        
    };

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

    render() {
        return (
            <View>
                <Button onPress={this._showDialog}>Ciudad</Button>
                <Portal>
                    <Dialog
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Selecciona tu ciudad</Dialog.Title>
                        <Dialog.Content>
                            <TouchableOpacity style={{width:'100%'}}>
                                <Drawer.Item label="First Item" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'100%'}}>
                                <Drawer.Item label="Second Item" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'100%'}}>
                                <Drawer.Item label="Terth Item" />
                            </TouchableOpacity>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}