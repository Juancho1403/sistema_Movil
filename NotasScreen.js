import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotasScreen({ navigation }) {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        const cargarNotas = async () => {
            try {
                const notasGuardadas = await AsyncStorage.getItem('notas');
                if (notasGuardadas !== null) {
                    setNotas(JSON.parse(notasGuardadas));
                }
            } catch (e) {
                console.error('Error cargando notas:', e);
            }
        };

        cargarNotas();
    }, []);

    const guardarNotas = async (nuevasNotas) => {
        try {
            await AsyncStorage.setItem('notas', JSON.stringify(nuevasNotas));
        } catch (e) {
            console.error('Error guardando notas:', e);
        }
    };

    const agregarNota = (nuevaNota) => {
        const nuevasNotas = [...notas, { id: Date.now().toString(), texto: nuevaNota }];
        setNotas(nuevasNotas);
        guardarNotas(nuevasNotas);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={notas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.nota}>
                        <Text style={styles.texto}>{item.texto}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay notas aún.</Text>}
            />
            <TouchableOpacity
                style={styles.botonAgregar}
                onPress={() => navigation.navigate('CrearNotaScreen', { agregarNota })}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', padding: 20 },
    nota: { backgroundColor: '#111', padding: 15, borderRadius: 8, marginBottom: 10 },
    texto: { color: '#fff', fontSize: 16 },
    empty: { color: '#aaa', textAlign: 'center', marginTop: 30 },
    botonAgregar: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
    },
});
