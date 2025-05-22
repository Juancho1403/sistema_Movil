import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorScreen = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handlePress = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleEvaluate = () => {
        console.log('Evaluando expresión:', input); // Log para depuración
        try {
            setResult(eval(input).toString());
        } catch (error) {
            setResult('Error');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.screen}>
                <Text style={styles.input}>{input}</Text>
                <Text style={styles.result}>{result}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handlePress('1')} style={styles.button}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('2')} style={styles.button}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('3')} style={styles.button}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('+')} style={styles.button}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handlePress('4')} style={styles.button}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('5')} style={styles.button}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('6')} style={styles.button}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('-')} style={styles.button}><Text style={styles.buttonText}>-</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handlePress('7')} style={styles.button}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('8')} style={styles.button}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('9')} style={styles.button}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('*')} style={styles.button}><Text style={styles.buttonText}>*</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handlePress('0')} style={styles.button}><Text style={styles.buttonText}>0</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleClear} style={styles.button}><Text style={styles.buttonText}>C</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('/')} style={styles.button}><Text style={styles.buttonText}>/</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleEvaluate} style={styles.button}><Text style={styles.buttonText}>=</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Fondo oscuro
    },
    screen: {
        width: '80%',
        padding: 20,
        backgroundColor: '#1f1f1f', // Fondo de la pantalla de la calculadora
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'flex-end',
    },
    input: {
        fontSize: 30,
        marginBottom: 10,
        color: '#fff', // Texto claro
    },
    result: {
        fontSize: 40,
        color: '#00ff00', // Verde para el resultado
    },
    buttonContainer: {
        width: '80%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        width: '20%',
        padding: 20,
        backgroundColor: '#333', // Fondo oscuro para los botones
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff', // Texto claro en los botones
    },
});

export default CalculatorScreen;
