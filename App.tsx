// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';

import AttendanceCycleScreen from './src/screens/AttendanceCycleScreen';
import RfidSrartRegAttenScreen from './src/screens/RfidSrartRegAttenScreen';
import CardWriteScreen from './src/screens/CardWriteScreen';
import ClassDetailsScreen from './src/screens/ClassDetailsScreen';
import OverviewScreen from './src/screens/OverviewScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="RfidSrartRegAtten"
          component={RfidSrartRegAttenScreen}
        />
        <Stack.Screen name="CardWrite" component={CardWriteScreen} />
        <Stack.Screen
          name="AttendanceCycle"
          component={AttendanceCycleScreen}
        />
        <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
        <Stack.Screen name="Overview" component={OverviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
