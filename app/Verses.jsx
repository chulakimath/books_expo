import { useLocalSearchParams as UseLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiUrl from '../configs/api';

const Verses = () => {
    const params = UseLocalSearchParams();
    const { book_id, chapter_number } = params;
    const [verses, setVerse] = useState([]);
    useEffect(() => {
        getVerses()
    },[])
    const getVerses = async () => {
      
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
    }
    return (
        <SafeAreaView>
            <Text>Verses</Text>

        </SafeAreaView>
    )
}

export default Verses

const styles = StyleSheet.create({})