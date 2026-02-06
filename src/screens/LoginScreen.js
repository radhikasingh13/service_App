import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getData } from '../data/storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const login = async () => {
        const user = await getData('USER');
        console.log(user)
        if (user?.email === email && user?.password === password) {
            navigation.navigate('Services')
        } else {
            setError('Wrong Credentials')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={setPassword} />
            <Button title='Login' onPress={login} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
            {error && <Text>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:
        { flex: 1, backgroundColor: 'white', padding: 20 },
    input: {
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
})