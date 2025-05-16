import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import NavegacionTab1 from './Navigator';
import Contacts from './Contacts';
import Porfile from './Porfile';
import { StyleSheet, Image, View} from 'react-native';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <Tab.Navigator initialRouteName='Ofertas' screenOptions={{
      "tabBarStyle": [
        {
          "display": "flex",
          "height": hp('10%'),
        },
        null
      ]
    }}>
      <Tab.Screen name="Perfil" component={Porfile} options={{
        tabBarLabel:"Perfil",
        tabBarActiveBackgroundColor: "#25579B",
        tabBarInactiveBackgroundColor: "#6986AD",
        tabBarLabelStyle: styles.labelTxt,
        tabBarIcon: ({focused}) => (
          <Image 
            source={require('../images/person.png')}
            resizeMode='contain'
            style={{
              width: wp('10%'),
              height: hp('10%'),
              tintColor: focused ? '#ffffff' : '#ffffff',
            }}
          />
        ),
        headerShown:false}} />
      <Tab.Screen name="Ofertas" component={NavegacionTab1} options={{
        tabBarLabel:"Ofertas",
        tabBarActiveBackgroundColor: "#25579B",
        tabBarInactiveBackgroundColor: "#6986AD",
        tabBarLabelStyle: styles.labelTxt,
        tabBarIcon: ({focused}) => (
          <Image 
            source={require('../images/offers.png')}
            resizeMode='contain'
            style={{
              width: wp('10%'),
              height: hp('10%'),
              tintColor: focused ? '#ffffff' : '#ffffff',
            }}
          />
        ),
        headerShown:false}}/>
      <Tab.Screen name="Contactos" component={Contacts} options={{
        tabBarLabel:"Contactos",
        tabBarActiveBackgroundColor: "#25579B",
        tabBarInactiveBackgroundColor: "#6986AD",
        tabBarLabelStyle: styles.labelTxt,
        tabBarIcon: ({focused}) => (
          <Image 
            source={require('../images/contacts.png')}
            resizeMode='contain'
            style={{
              width: wp('10%'),
              height: hp('10%'),
              tintColor: focused ? '#ffffff' : '#ffffff',
            }}
          />
        ),
        headerShown:false}}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container:{
    width: wp('100%'),
    height: hp('30%'),
    borderWidth: 3,
  },
  labelTxt:{
    color: "#ffffff",
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
});