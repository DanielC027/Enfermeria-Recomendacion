import React, { Component } from 'react'
import { Text, View ,Image, StyleSheet, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NavigationContext } from '@react-navigation/native';

import Header from './Header';

export default class Offers extends Component {
  render() {
    const iniciarSesion = () => {
      console.log("iniciar sesion");
    }
    return (
      <View style={styles.container}>
        <Header/>
        <Image 
        style={styles.imagen_e}
        source={
            require(
                "../images/enfermeria.jpg"
            )
        }/>
        <ButtonsElection/>
      </View>
    )
  }
}

const navigate = NavigationContext

function iniciarSesion(){
  console.log("iniciar sesion");
  navigate.navigate("Informacion")
}

function ButtonsElection(){
  return(
    <View style={styles.buttonsBox}>
      <View style={[styles.buttonBox, {marginLeft: wp('5%')}]}>
        <TouchableOpacity style={styles.buttonTouchable} onPress={iniciarSesion}>
          <Text style={styles.buttonTxt}>INICIAR SESION</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonBox, {marginLeft: wp('55%'), marginTop: hp('-10%')}]}>
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonTxt}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    //backgroundColor: 'white',
  },
  imagen_e : {
    width: wp('100%'),
    height: hp('45%'),
    alignItems: 'center',
  },
  /* BUTTONS */
    buttonsBox:{
      //borderWidth: 3,
      width: wp('100%'),
      height: hp('10%'),
      marginTop: hp('2%'),
    },
    buttonBox:{
      //borderWidth: wp('0.5%'),
      borderRadius: wp('5%'),
      width: wp('40%'),
      height: hp('10%'),
      backgroundColor: "#DEDFDE",
    },
    buttonTouchable:{
      width: wp('40%'),
      height: hp('10%'),
      justifyContent: "center",
    },
    buttonTxt:{
      color: "#004AAD",
      textAlign: "center",
    },
});
