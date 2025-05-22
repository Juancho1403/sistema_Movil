import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CalendarScreen = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date(); // Obtener el día de hoy

    const getMonthName = (monthIndex) => {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[monthIndex];
    };

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 0);
        return date.getDate(); // Obtiene la cantidad de días del mes
    };

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const handlePreviousMonth = () => {
        const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        setCurrentDate(new Date(prevMonth));
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        setCurrentDate(new Date(nextMonth));
    };

    const isToday = (day) => {
        return today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();
    };

    return (
        <View style={styles.container}>
            {/* Barra de navegación */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousMonth}>
                    <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.monthText}>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                    <Ionicons name="chevron-forward" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* Días del mes */}
            <FlatList
                data={generateCalendar()}
                keyExtractor={(item) => item.toString()}
                numColumns={7}
                contentContainerStyle={styles.calendarContainer}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.dayItem,
                            isToday(item) && styles.todayDayItem // Resaltar el día de hoy
                        ]}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                isToday(item) && styles.todayDayText // Cambiar el color del texto si es hoy
                            ]}
                        >
                            {item}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    monthText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    calendarContainer: {
        paddingHorizontal: 20,
    },
    dayItem: {
        width: '12%',
        margin: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 5,
    },
    dayText: {
        color: 'white',
        fontSize: 18,
    },
    todayDayItem: {
        backgroundColor: '#007AFF', // Resaltar el día de hoy con un color diferente
    },
    todayDayText: {
        color: '#fff', // Asegurarse de que el texto del día de hoy sea blanco
        fontWeight: 'bold',
    },
});

export default CalendarScreen;
