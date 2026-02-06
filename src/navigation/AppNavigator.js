import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ServiceListScreen from '../screens/ServiceListScreen'
import BookingHistoryScreen from '../screens/BookingHistoryScreen'
import DetailsScreen from '../screens/DetailsScreen'

const Stack = createNativeStackNavigator()
export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Services" component={ServiceListScreen} />
            <Stack.Screen name="History" component={BookingHistoryScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}