import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import axios from 'axios'

const PAGE_SIZE = 2;

export default function ServiceListScreen({ navigation }) {
    const [search, setSearch] = useState('')
    const [allservices, setAllServices] = useState([])
    const [visibleService, setVisibleService] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)

    const fetchServiceProviders = async () => {
        setLoading(true)
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            setAllServices(res.data)
            setPage(1)
            setVisibleService(res.data?.slice(0, PAGE_SIZE))
            setError('')
        } catch (error) {
            console.log("error", error)
            setError(error)
        }
        setLoading(false)
        setRefreshing(false)
    }

    useEffect(() => {
        fetchServiceProviders();
    }, [])

    const onSearchChange = text => {
        setSearch(text);

        const filtered = allservices.filter((item) =>
            item.name.toLowerCase().includes((text.toLowerCase())));

        setPage(1);
        setVisibleService(filtered.slice(0, PAGE_SIZE))
    }

    const loadMore = () => {
        const nextPage = page + 1;
        const start = page + PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const filtered = search ? allservices.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : allservices;

        const nextData = filtered.slice(start, end);
        if (nextData.length > 0) {
            setVisibleService(prev => [...prev, ...nextData]);
            setPage(nextPage)
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchServiceProviders()
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginVertical: 10, backgroundColor: 'skyblue', padding: 6 }} onPress={() => navigation.navigate('Details', { serviceId: item.id, serviceName: item.name })} >
                <Text>{item.name}</Text>
                <Text>COMPANY NAME{item.company.name}</Text>
                <Text>{item.phone}</Text>
            </TouchableOpacity>
        )
    }

    if (loading) return <ActivityIndicator size="large" />
    return (
        <View style={styles.container}>
            <TextInput placeholder='Search service' value={search} onChangeText={onSearchChange} style={styles.input} />
            <FlatList data={visibleService} keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                initialNumToRender={5}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
            <TouchableOpacity onPress={() => navigation.navigate('History')} >
                <Text>View Booking History</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { padding: 20, backgroundColor: 'white' }
})