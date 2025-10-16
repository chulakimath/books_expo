import { useLocalSearchParams as UseLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { apiUrl } from '../configs/api';
import COLORS from '../configs/colors';
import PageLoader from './components/PageLoader';
import VersesCard from './components/VersesCard';



const Verses = () => {
    const params = UseLocalSearchParams();
    const { book_id, chapter_number, name_translation, name } = params;
    const [verses, setVerse] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getVerses()
    }, [])
    const getVerses = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/books/verses/${book_id}/${chapter_number}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET"
            })
            const data = await response.json();
            if (data.status) {
                setVerse(data.verses)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={[styles.container]}>
            {/* <View style={[styles.header]}>
                <Text style={[styles.title]}>{name_translation}</Text>
                <Text style={[styles.subTitle]}>{name}</Text>
            </View> */}
            <View style={[styles.body]}>
                <PageLoader loading={loading} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={verses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <VersesCard item={item} />}
                />
            </View>
        </View>
    )
}

export default Verses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    title: {
        color: COLORS.textPrimary,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 10,
        padding: 10,

    },
    subTitle: {
        color: COLORS.textPrimary,
        fontSize: 14,
        textAlign: 'center',
        padding: 10,

    },
    body: {
        backgroundColor: COLORS.backgroundLight,
        flex: 1,
        padding: 10,
    },
    header: {
        borderBottomWidth:0.5,
        borderBottomColor:COLORS.primary,
    }
})