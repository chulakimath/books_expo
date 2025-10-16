import COLORS from '@/configs/colors';
import { useLocalSearchParams as UseLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { apiUrl } from '../configs/api';
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
    <View style={[styles.container]} >
      <PageLoader loading={loading} />
      {/* <View style={[styles.header]}>
        <Text style={[styles.title]}>Chapters</Text>
      </View> */}
      <View style={[styles.body]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chapters}
          // refreshing={loading}
          // onRefresh={getChapatersByBookId}
          contentContainerStyle={{
            paddingTop: 0,
            paddingBottom: 10,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChaptersCard item={item} />}
        />

      </View>
    </View>
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
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    padding: 10,

  },
  body: {
    backgroundColor: COLORS.backgroundLight,
    flex: 1,
    // padding: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.primary,
  }
})