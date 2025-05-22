import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const ClockScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timer, setTimer] = useState(0); // Temporizador en segundos
    const [timerRunning, setTimerRunning] = useState(false); // Controla si el temporizador está en marcha
    const [stopwatch, setStopwatch] = useState(0); // Cronómetro en segundos
    const [stopwatchRunning, setStopwatchRunning] = useState(false); // Controla si el cronómetro está en marcha

    useEffect(() => {
        // Actualización de la hora
        const clockInterval = setInterval(() => {
            setCurrentTime(new Date()); // Actualiza la hora cada segundo
        }, 1000);

        // Temporizador
        const timerInterval = setInterval(() => {
            if (timerRunning && timer > 0) {
                setTimer(prev => prev - 1); // Decrementa el temporizador cada segundo
            }
        }, 1000);

        // Cronómetro
        const stopwatchInterval = setInterval(() => {
            if (stopwatchRunning) {
                setStopwatch(prev => prev + 1); // Incrementa el cronómetro cada segundo
            }
        }, 1000);

        return () => {
            clearInterval(clockInterval);
            clearInterval(timerInterval);
            clearInterval(stopwatchInterval);
        };
    }, [timerRunning, stopwatchRunning, timer]);

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const formatTimeInSeconds = (seconds) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    const startTimer = () => {
        if (timer > 0) {
            setTimerRunning(true);
        }
    };

    const stopTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        setTimer(0);
        setTimerRunning(false);
    };

    const startStopwatch = () => {
        setStopwatchRunning(true);
    };

    const stopStopwatch = () => {
        setStopwatchRunning(false);
    };

    const resetStopwatch = () => {
        setStopwatch(0);
        setStopwatchRunning(false);
    };

    return (
        <View style={styles.container}>
            {/* Hora Actual */}
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

            {/* Fecha */}
            <Text style={styles.dateText}>
                {`${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()}`}
            </Text>

            {/* Temporizador */}
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Temporizador</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Tiempo (segundos)"
                    placeholderTextColor="#aaa"
                    value={String(timer)}
                    onChangeText={(text) => setTimer(parseInt(text))}
                />
                <Text style={styles.timerDisplay}>{formatTimeInSeconds(timer)}</Text>
                <TouchableOpacity style={styles.button} onPress={startTimer}>
                    <Text style={styles.buttonText}>Iniciar Temporizador</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={stopTimer}>
                    <Text style={styles.buttonText}>Detener Temporizador</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={resetTimer}>
                    <Text style={styles.buttonText}>Reiniciar Temporizador</Text>
                </TouchableOpacity>
            </View>

            {/* Cronómetro */}
            <View style={styles.stopwatchContainer}>
                <Text style={styles.stopwatchText}>Cronómetro</Text>
                <Text style={styles.stopwatchDisplay}>{formatTimeInSeconds(stopwatch)}</Text>
                <TouchableOpacity style={styles.button} onPress={startStopwatch}>
                    <Text style={styles.buttonText}>Iniciar Cronómetro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
                    <Text style={styles.buttonText}>Detener Cronómetro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
                    <Text style={styles.buttonText}>Reiniciar Cronómetro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    timeText: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
    },
    timerContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    timerText: {
        color: 'white',
        fontSize: 24,
    },
    timerDisplay: {
        fontSize: 40,
        color: 'white',
        marginVertical: 10,
    },
    stopwatchContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    stopwatchText: {
        color: 'white',
        fontSize: 24,
    },
    stopwatchDisplay: {
        fontSize: 40,
        color: 'white',
        marginVertical: 10,
    },
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
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default ClockScreen;
