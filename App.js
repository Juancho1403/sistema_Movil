import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Asegúrate de que la ruta sea correcta
import CallScreen from './CallScreen'; // Asegúrate de que la ruta sea correcta
import CameraScreen from './CameraScreen'; // Asegúrate de que la ruta sea correcta
import SendMessageScreen from './SendMessageScreen'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* Asegúrate de usar el prop `component` para pasar el componente */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="SendMessageScreen" component={SendMessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
