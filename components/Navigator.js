
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import RecomendationScreen from './Recomendacion';

const Stack = createNativeStackNavigator();

export default function NavegacionTab1 () {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Informacion" component={RecomendationScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}