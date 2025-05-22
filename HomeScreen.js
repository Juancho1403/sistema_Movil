import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Linking,
    ImageBackground,
    Modal,
    Pressable,
    Animated,
    Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import * as Battery from 'expo-battery';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const openWeather = () => {
    const url = 'meteored://';
    Linking.openURL(url).catch(() => Linking.openURL('https://www.meteored.com'));
};

const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permiso denegado para acceder a la galería');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    if (!result.canceled) {
        console.log('Imagen seleccionada:', result.assets[0].uri);
    }
};

const openSpotify = () => Linking.openURL('spotify://').catch(err => console.error('Spotify:', err));
const openDiscord = () => Linking.openURL('discord://').catch(() => Linking.openURL('https://discord.com'));
const openYouTube = () => Linking.openURL('youtube://').catch(() => Linking.openURL('https://www.youtube.com'));
const openWhatsApp = () => Linking.openURL('whatsapp://').catch(() => Linking.openURL('https://web.whatsapp.com'));
const openSettings = () => Linking.openURL('intent://settings#Intent;scheme=package;package=com.android.settings;end');
const openGoogleChrome = () => Linking.openURL('googlechrome://').catch(err => console.error('Chrome:', err));
const openPlayStore = () => Linking.openURL('https://play.google.com/store');

const HomeScreen = () => {
    const navigation = useNavigation();
    const [time, setTime] = useState(new Date());
    const [wifiConnected, setWifiConnected] = useState(false);
    const [cellularConnected, setCellularConnected] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [actionType, setActionType] = useState(null);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const unsubscribe = NetInfo.addEventListener(state => {
            setWifiConnected(state.isConnected && state.type === 'wifi');
            setCellularConnected(state.isConnected && state.type === 'cellular');
        });

        const getBatteryLevel = async () => {
            const batteryState = await Battery.getBatteryLevelAsync();
            setBatteryLevel(Math.round(batteryState * 100));
        };

        getBatteryLevel();
        const batterySubscription = Battery.addBatteryLevelListener(({ batteryLevel: level }) => {
            setBatteryLevel(Math.round(level * 100));
        });

        return () => {
            clearInterval(timer);
            unsubscribe();
            batterySubscription.remove();
        };
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    }, []);

    const formatTime = (date) =>
        `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const apps = [
        { id: '1', name: 'Teléfono', icon: 'call', action: () => navigation.navigate('CallScreen') },
        { id: '2', name: 'Mensajes', icon: 'chatbubble', action: () => navigation.navigate('SendMessageScreen') },
        { id: '3', name: 'Cámara', icon: 'camera', action: () => navigation.navigate('CameraScreen') },
        { id: '4', name: 'Galería', icon: 'images', action: () => openImagePicker() },
        { id: '5', name: 'Configuración', icon: 'settings', action: openSettings },
        { id: '6', name: 'Música', icon: 'musical-notes', action: openSpotify },
        { id: '7', name: 'Calendario', icon: 'calendar', action: () => navigation.navigate('CalendarScreen') },
        { id: '8', name: 'Reloj', icon: 'alarm', action: () => navigation.navigate('ClockScreen') },
        { id: '9', name: 'Notas', icon: 'document-text', action: () => navigation.navigate('NotasScreen') },
        { id: '10', name: 'Calculadora', icon: 'calculator', action: () => navigation.navigate('CalculatorScreen') },
        { id: '11', name: 'Clima', icon: 'partly-sunny', action: openWeather },
        { id: '12', name: 'Navegador', icon: 'globe-outline', action: openGoogleChrome },
        { id: '13', name: 'Micrófono', icon: 'mic', action: () => navigation.navigate('MicrophoneScreen') },
        { id: '14', name: 'Discord', icon: 'logo-discord', action: openDiscord },
        { id: '15', name: 'YouTube', icon: 'logo-youtube', action: openYouTube },
        { id: '16', name: 'WhatsApp', icon: 'logo-whatsapp', action: openWhatsApp },
        { id: '17', name: 'Play Store', icon: 'logo-google', action: openPlayStore },
    ];

    const dockApps = [
        { id: 'd1', name: 'Teléfono', icon: 'call', action: () => navigation.navigate('CallScreen') },
        { id: 'd2', name: 'Mensajes', icon: 'chatbubble', action: () => navigation.navigate('SendMessageScreen') },
        { id: 'd3', name: 'Cámara', icon: 'camera', action: () => navigation.navigate('CameraScreen') },
        { id: 'd4', name: 'Navegador', icon: 'globe-outline', action: openGoogleChrome },
    ];

    const handleShutdown = () => {
        setActionType('shutdown');
        setModalVisible(true);
    };

    const handleRestart = () => {
        setActionType('restart');
        setModalVisible(true);
    };

    const confirmAction = () => {
        setModalVisible(false);
        alert(`Por favor, ${actionType === 'shutdown' ? 'apague' : 'reinicie'} el dispositivo manualmente.`);
    };

    return (
        <ImageBackground source={require('./imagenes/agua.jpg')} style={styles.container}>
            <View style={styles.statusBar}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.time}>{formatTime(time)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {cellularConnected && <Ionicons name="cellular" size={20} color="white" />}
                    {wifiConnected && <Ionicons name="wifi" size={20} color="white" />}
                    <Ionicons name="battery-full" size={24} color="white" />
                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>{batteryLevel}%</Text>
                </View>
            </View>

            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                <FlatList
                    data={apps}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.appIcon} onPress={item.action}>
                            <Ionicons name={item.icon} size={40} color="#fff" />
                            <Text style={styles.appText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </Animated.View>

            <View style={styles.dock}>
                {dockApps.map((app) => (
                    <TouchableOpacity key={app.id} style={styles.dockIcon} onPress={app.action}>
                        <Ionicons name={app.icon} size={28} color="white" />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.dockIcon} onPress={handleShutdown}>
                    <Text style={styles.actionButtonText}>Apagar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dockIcon, { backgroundColor: '#4caf50' }]} onPress={handleRestart}>
                    <Text style={styles.actionButtonText}>Reiniciar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        {`¿Deseas ${actionType === 'shutdown' ? 'apagar' : 'reiniciar'} el dispositivo?`}
                    </Text>
                    <Pressable style={styles.button} onPress={confirmAction}>
                        <Text style={styles.textStyle}>Confirmar</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                </View>
            </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    statusBar: {
        position: 'absolute',
        top: 40,
        left: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    time: { color: 'white', fontSize: 20 },
    appIcon: {
        width: '45%',
        aspectRatio: 1,
        backgroundColor: '#111',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    appText: {
        color: '#fff',
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    dock: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#000a',
        padding: 10,
    },
    dockIcon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: { color: 'white', fontSize: 12 },  // Ajustado para el tamaño del dock
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: { fontSize: 20, marginBottom: 20 },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    textStyle: { color: 'white', fontSize: 16 },
});

export default HomeScreen;
