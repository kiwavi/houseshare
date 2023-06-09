import React,{useState, useEffect} from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import openMap from 'react-native-open-maps';
import Toast from 'react-native-toast-message';
import {BackHandler} from 'react-native';


export default function Home () {
    const {message} = useSelector((state) => state.message);
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');
        
    
    BackHandler.addEventListener("hardwareBackPress", onBackPress);    
    
    function onBackPress () {
        var clickCount = 0;
        clickCount = clickCount + 1;
        if (clickCount <= 1) {
            console.log('First count');
        }

        else {
            console.log('Second count');
            BackHandler.exitApp();
        }
        
    };
    
            
    useEffect(() => {                
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    function goThere () {
        const coordinates = {"lat": "-1.394936", "lng": "36.7658811", "name": "Rongai Town Church"};
        const latitude = parseFloat(coordinates['lat']);
        const longitude = parseFloat(coordinates['lng']);
        openMap({latitude, longitude});
        // openMap({ latitude: 37.865101, longitude: -119.538330 });
    }

    
    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');
                
                //getting the Longitude from the location json
                const currentLongitude = 
                      JSON.stringify(position.coords.longitude);
                
                //getting the Latitude from the location json
                const currentLatitude = 
                      JSON.stringify(position.coords.latitude);
                
                //Setting Longitude state
                setCurrentLongitude(currentLongitude);
                
                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };
    
    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                
                setLocationStatus('You are Here');
                console.log(position);
                
                //getting the Longitude from the location json        
                const currentLongitude =
                      JSON.stringify(position.coords.longitude);
                
                //getting the Latitude from the location json
                const currentLatitude = 
                      JSON.stringify(position.coords.latitude);
                
                //Setting Longitude state
                setCurrentLongitude(currentLongitude);
                
                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );            
    };

    return (
	<View style={styles.container}>
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>

          <Button
            color={'#bdc3c7'}
            onPress={goThere}
            title="Click To Open Maps 🗺">
          </Button>
	</View>
    );
    
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
    },
});
