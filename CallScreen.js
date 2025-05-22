import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CallScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const makeCall = () => {
        if (phoneNumber.trim() !== '') {
            Linking.openURL(`tel:${phoneNumber}`);
            Keyboard.dismiss(); // Para ocultar el teclado después de hacer la llamada
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
                //inhabilitar el teclado nativo
                editable={false}
                style={styles.input}
                placeholder="Ingrese un número"
                placeholderTextColor="#aaa"
                keyboardType="numeric" // Este es el teclado numérico
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={15} // Limitar la cantidad de caracteres
            />

            {/* Teclado numérico personalizado */}
            <View style={styles.keypad}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '1')} style={styles.key}>
                        <Text style={styles.keyText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '2')} style={styles.key}>
                        <Text style={styles.keyText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '3')} style={styles.key}>
                        <Text style={styles.keyText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '4')} style={styles.key}>
                        <Text style={styles.keyText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '5')} style={styles.key}>
                        <Text style={styles.keyText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '6')} style={styles.key}>
                        <Text style={styles.keyText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '7')} style={styles.key}>
                        <Text style={styles.keyText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '8')} style={styles.key}>
                        <Text style={styles.keyText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '9')} style={styles.key}>
                        <Text style={styles.keyText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => setPhoneNumber(phoneNumber + '0')} style={styles.key}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPhoneNumber('')} style={styles.key}>
                        <Text style={styles.keyText}>Borrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
    keypad: {
        width: '80%',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    key: {
        width: '30%',
        height: 60,
        backgroundColor: '#333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        color: 'white',
        fontSize: 24,
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
