import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Linking, Alert } from 'react-native';

const SendMessageScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    // Función para enviar el mensaje abriendo la aplicación de mensajes
    const sendMessage = () => {
        if (!phoneNumber || !message) {
            Alert.alert('Error', 'Por favor, ingresa un número y un mensaje.');
            return;
        }

        // Creando el enlace para abrir la aplicación de SMS
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

        // Abriendo la aplicación de mensajes
        Linking.openURL(url).catch(err => {
            Alert.alert('Error', 'No se pudo abrir la aplicación de mensajes.');
            console.error(err);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enviar mensaje</Text>

            <TextInput
                style={styles.input}
                placeholder="Número de teléfonoooo"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Escribe tu mensaje"
                value={message}
                onChangeText={setMessage}
                multiline
            />

            <Button title="Enviar mensaje" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',


    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default SendMessageScreen;
