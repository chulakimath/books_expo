import COLORS from '@/configs/colors';
import { useLocalSearchParams as UseLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiUrl from '../configs/api';
import ChaptersCard from "./components/ChaptersCard";
import PageLoader from "./components/PageLoader";
const Chapters = () => {
  const params = UseLocalSearchParams();
  const { id } = params;
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getChapatersByBookId()
  }, [])

  const getChapatersByBookId = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/books/chapters/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      const data = await response.json()
      if (data.status) {
        setChapters(data.chapters)
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <PageLoader loading={loading} />
      <View style={[styles.header]}>
        <Text style={[styles.title]}>Chapters</Text>
      </View>
      <View style={[styles.body]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chapters}
          // refreshing={loading}
          // onRefresh={getChapatersByBookId}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChaptersCard item={item} />}
        />

      </View>
    </SafeAreaView>
  )
}

export default Chapters

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    // fontWeight:'bold',
    textAlign: 'center',
    marginTop: 10,
    padding: 10,

  },
  body: {
    backgroundColor: COLORS.backgroundLight,
    flex: 1,
    padding: 10,
  },
})