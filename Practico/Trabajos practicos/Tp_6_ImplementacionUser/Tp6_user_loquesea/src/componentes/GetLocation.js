import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { connect } from 'react-redux'

class GetLocation extends Component {

    componentDidMount() {
        this._enableLocation()
    }

    _enableLocation = () => {
        console.log('setInterval Capaz je')
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {
                //  - "already-enabled" if the location services has been already enabled
                //  - "enabled" if user has clicked on OK button in the popup
                this._getLocation()
            }).catch(err => {
                // The user has not accepted to enable the location services or something went wrong during the process
                // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                // codes : 
                //  - ERR00 : The user has clicked on Cancel button in the popup
                //  - ERR01 : If the Settings change are unavailable
                //  - ERR02 : If the popup has failed to open
                Alert.alert(err.code)
            });

    }

    _getLocation = () => {
        console.log('Iniciando GetLocation')
        RNLocation.configure({
            distanceFilter: 1.0,

            interval: 5000,
            desiredAccuracy: {
                ios: 'best',
                android: 'highAccuracy'
            }

        })
            .then(() => RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "fine",
                    rationale: {
                        title: "Necesitamos acceder a tu ubicación",
                        message: "Utilizamos tu ubicación para brindarte un mejor servicio",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            })
                .then(granted => {
                    if (granted) {
                        this._startUpdatingLocation()
                    }
                })
            )
    }

    _startUpdatingLocation = () => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            location => {
                this.props.updateLocation(location[0]);
                console.log(location)
            }
        );
    }

    _stopUpdatingLocation = () => {
        this.locationSubscription && this.locationSubscription();
    }

    componentWillUnmount() {
        console.log('Apagando GetLocation')
        this._stopUpdatingLocation()
    }

    render() {
        return <View />
    }

}

export default GetLocation;