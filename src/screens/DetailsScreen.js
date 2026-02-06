import { View, Text, Alert, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DetailsScreen({ route, navigation }) {
    const { serviceName, serviceId } = route.params;
    const [dateTime, setDateTime] = useState(new Date())


    const bookService = async () => {
        const booking = {
            id: Date.now(),
            serviceId: serviceId,
            name: serviceName,
            dateBooked: dateTime,
            createdAt: new Date(),
        }
        try {
            const existing = JSON.parse(await AsyncStorage.getItem('BOOKINGS')) || []

            await AsyncStorage.setItem('BOOKINGS', JSON.stringify([...existing, booking]))

            Alert.alert('Success', 'Service booked')
            navigation.navigate('History')
        } catch (error) {
            Alert.alert('Error', 'Booking failed')
        }
    }
    return (
        <View style={styles.container}>
            <Text>NAME: {serviceId && serviceId}</Text>
            <Text>USERNAME: {serviceName && serviceName}</Text>

            <DateTimePicker value={dateTime} onChange={(e, date) => setDateTime(date)} />
            <Button title='Book Service' onPress={bookService} />

        </View>
    )
}

const styles = StyleSheet.create({
    container:
        { flex: 1, backgroundColor: 'white', padding: 20 },
})