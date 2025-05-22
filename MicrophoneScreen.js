import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

export default function MicrophoneScreen() {
    const [recording, setRecording] = useState(null);
    const [audioUri, setAudioUri] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);

    const shareRecording = async () => {
        if (audioUri) {
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(audioUri);
            } else {
                alert('La función de compartir no está disponible');
            }
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso denegado para usar el micrófono');
            }
        })();
    }, []);

    const startRecording = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) return alert('Permiso denegado');

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );

            setRecording(recording);
            setRecordingTime(0);

            // Iniciar el cronómetro
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error('Error al iniciar la grabación:', err);
        }
    };

    const stopRecording = async () => {
        try {
            if (!recording) return;

            clearInterval(timerRef.current);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setAudioUri(uri);
            setRecording(null);
            setRecordingTime(0);
            console.log('Audio guardado en:', uri);
        } catch (err) {
            console.error('Error al detener la grabación:', err);
        }
    };

    // Formato mm:ss
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={recording ? stopRecording : startRecording}
                style={[styles.button, recording && styles.buttonRecording]}
            >
                <Text style={styles.buttonText}>
                    {recording ? 'Detener Grabación' : 'Iniciar Grabación'}
                </Text>
            </TouchableOpacity>

            {recording && (
                <Text style={styles.timerText}>
                    {formatTime(recordingTime)}
                </Text>
            )}

            {audioUri && (
                <TouchableOpacity style={styles.button} onPress={shareRecording}>
                    <Text style={styles.buttonText}>Compartir Grabación</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonRecording: {
        backgroundColor: '#dc3545', // rojo cuando está grabando
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    timerText: {
        fontSize: 28,
        color: '#0f0',
        marginBottom: 20,
    },
    audioText: {
        marginTop: 20,
        color: 'white',
        textAlign: 'center',
    },
});
