import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import * as Battery from 'expo-battery'; // Importamos el paquete de batería

const HomeScreen = ({ navigation }) => {
    const [time, setTime] = useState(new Date());
    const [wifiConnected, setWifiConnected] = useState(false);
    const [cellularConnected, setCellularConnected] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(0);

    useEffect(() => {
        // Configurar intervalos para actualizar la hora
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Suscribirse a los cambios de estado de la red
        const unsubscribe = NetInfo.addEventListener(state => {
            // Actualizamos el estado de la conexión a Wi-Fi y celular
            setWifiConnected(state.isConnected && state.type === 'wifi');
            setCellularConnected(state.isConnected && state.type === 'cellular');
        });

        // Obtener el nivel de batería
        const getBatteryLevel = async () => {
            const batteryState = await Battery.getBatteryLevelAsync();
            setBatteryLevel(Math.round(batteryState * 100)); // Redondeamos al entero más cercano
        };

        getBatteryLevel(); // Llamamos a la función para obtener el nivel inicial

        // Escuchar cambios en el nivel de batería
        console.log('Battery:', Battery);
        console.log('Battery Level:', batteryLevel);
        const batterySubscription = Battery.addBatteryLevelListener(({ batteryLevel: level }) => {
            setBatteryLevel(Math.round(level * 100)); // Actualizamos el nivel de batería
        });

        return () => {
            clearInterval(timer);
            unsubscribe(); // Limpiamos la suscripción al desmontar el componente
            batterySubscription.remove(); // Limpiamos la suscripción de batería
        };
    }, []);

    const formatTime = (date) =>
        `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const apps = [
        { id: '1', name: 'Teléfono', icon: 'call', action: () => navigation.navigate('CallScreen') },
        { id: '2', name: 'Mensajes', icon: 'chatbubble', action: () => navigation.navigate('SendMessageScreen') },
        { id: '3', name: 'Cámara', icon: 'camera', action: () => navigation.navigate('CameraScreen') },
        { id: '4', name: 'Galería', icon: 'images', action: () => alert('Galería') },
    ];

    return (
        <View style={styles.container}>
            {/* Barra Superior */}
            <View style={styles.statusBar}>
                <Text style={styles.time}>{formatTime(time)}</Text>

                {/* Icono de la señal celular */}
                {cellularConnected && <Ionicons name="cellular" size={20} color="white" />}

                {/* Icono de Wi-Fi */}
                {wifiConnected && <Ionicons name="wifi" size={20} color="white" />}

                <Ionicons name="battery-full" size={24} color="white" />
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>{batteryLevel}%</Text>
            </View>

            {/* Apps */}
            <FlatList
                data={apps}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, marginTop: 100 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.appIcon} onPress={item.action}>
                        <Ionicons name={item.icon} size={40} color="#fff" />
                        <Text style={styles.appText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Barra Inferior */}
            <View style={styles.navBar}>
                <TouchableOpacity>
                    <Ionicons name="chevron-back" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="ellipse-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos actualizados
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    statusBar: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    time: { color: 'white', fontSize: 20 },
    appList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,  // Para darle espacio arriba
    },
    appIcon: {
        width: '45%',
        aspectRatio: 1,
        backgroundColor: '#111', // para que se vean los bordes
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    appText: { color: '#fff', marginTop: 5 },
    navBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#000',
    },
});

export default HomeScreen;
