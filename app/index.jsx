import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import apiUrl from "../configs/api";
import COLORS from "../configs/colors.js";
import BooksCard from "./components/BooksCard";

export default function Index() {
 
  const [loader, setLoader] = useState(false)
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    setLoader(true)
    try {
      const response = await fetch(`${apiUrl}/books`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      const data = await response.json()
      if (data.status) {
        setBooks(data.books)
      } else {
        console.log(data.error);

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false)

    }
  }
  useEffect(() => {
    getBooks()
  }, [])

  return (
    <View style={styles.container}>
      {/* <PageLoader loading={loader} /> */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BooksCard item={item} />}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={loader}
        onRefresh={getBooks}
        ListEmptyComponent={<Text style={styles.empty}>No books available</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  list: {
    marginTop: 10,
  },
  item: {
    marginBottom: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  loderText: {
    color: COLORS.textSecondary,
    textAlign: "center"
  }
});
