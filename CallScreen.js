import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CallScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const makeCall = () => {
        if (phoneNumber.trim() !== '') {
            Linking.openURL(`tel:${phoneNumber}`);
        } else {
            alert('Ingrese un número válido');
        }
    };

    return (
        <View style={styles.container}>
            {/* Barra superior con botón de regreso */}
            <View style={styles.statusBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Teléfono</Text>
            </View>

            {/* Campo de texto para ingresar el número */}
            <TextInput
                style={styles.input}
                placeholder="Ingrese un número"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            {/* Botón para llamar */}
            <TouchableOpacity style={styles.callButton} onPress={makeCall}>
                <Ionicons name="call" size={30} color="white" />
                <Text style={styles.callText}>Llamar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    statusBar: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: { color: 'white', fontSize: 20, marginLeft: 10 },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    callText: { color: 'white', fontSize: 18, marginLeft: 10 },
});

export default CallScreen;
