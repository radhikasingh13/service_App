import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { saveData } from "../data/storage"
export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const register = async () => {
        if (!email.includes('@')) {
            setError('Wrong Email')
            return
        }
        await saveData('USER', { email, password });
        navigation.navigate('Login')
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={setPassword} />
            <Button title='Register' onPress={register} />
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