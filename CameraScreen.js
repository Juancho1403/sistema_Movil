import React, { use, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()

    if (!hasPermission) return <PermissionsPage />
    if (device == null) return <NoCameraDeviceError />
    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
        />
    )
}