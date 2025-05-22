import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CrearNotaScreen({ navigation, route }) {
    const [texto, setTexto] = useState('');
    const agregarNota = route.params?.agregarNota;

    const guardarNota = () => {
        if (texto.trim() !== '') {
            agregarNota(texto);
            navigation.goBack();
        } else {
            alert('Escribe algo para guardar la nota');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu nota..."
                placeholderTextColor="#888"
                multiline
                value={texto}
                onChangeText={setTexto}
            />
            <TouchableOpacity style={styles.boton} onPress={guardarNota}>
                <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', padding: 20 },
    input: {
        backgroundColor: '#111',
        color: '#fff',
        padding: 15,
        borderRadius: 8,
        height: 200,
        textAlignVertical: 'top',
    },
    boton: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonTexto: { color: '#fff', fontSize: 16 },
});
