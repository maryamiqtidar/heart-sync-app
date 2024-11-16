import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './welcome';
import LoginScreen from './login';
import SignUpScreen from './signup';
import ProfileScreen from './profile';
import InstructionsScreen from './instructions';
import HistoryScreen from './history';
import HealthScreen from './health';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="InstructionsScreen" component={InstructionsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Health" component={HealthScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
