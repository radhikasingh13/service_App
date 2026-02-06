import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function BookingHistoryScreen() {

    const [bookings, setBookings] = useState([])
    useEffect(() => {
        loadBookings()
    }, [])

    const loadBookings = async () => {
        const data = await AsyncStorage.getItem('BOOKINGS')

        setBookings(data ? JSON.parse(data) : [])
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ padding: 5, marginVertical: 5 }}>
                <Text style={{ color: 'black' }}>{item.serviceId}</Text>
                <Text>{item.name}</Text>
                <Text>{item.dateBooked}</Text>
            </View>
        )
    }

    console.log(bookings)
    return (
        <View styles={styles.container}>
            <FlatList data={bookings} keyExtractor={item => item.id} renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
        { flex: 1, backgroundColor: 'white', padding: 20 },
})