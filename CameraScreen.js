import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
    const [photoUri, setPhotoUri] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const openCamera = async () => {
        // Pedir permisos de cámara
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
            setErrorMessage('Permiso para usar la cámara denegado.');
            return;
        }

        // Pedir permisos de galería
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        if (mediaStatus !== 'granted') {
            setErrorMessage('Permiso para acceder a la galería denegado.');
            return;
        }

        // Abrir cámara
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setPhotoUri(uri);
            setErrorMessage(null);

            try {
                // Guardar la imagen en la galería
                await MediaLibrary.saveToLibraryAsync(uri);
                console.log('Imagen guardada en la galería');
            } catch (error) {
                console.error('Error al guardar la imagen:', error);
                setErrorMessage('No se pudo guardar la imagen en la galería.');
            }
        } else {
            setErrorMessage('El usuario canceló la cámara.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openCamera} style={styles.button}>
                <Text style={styles.buttonText}>Abrir Cámara</Text>
            </TouchableOpacity>

            {photoUri && (
                <>
                    <Text style={{ marginTop: 20 }}>Foto tomada:</Text>
                    <Image source={{ uri: photoUri }} style={styles.imagePreview} />
                </>
            )}

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius: 10,
    },
});
