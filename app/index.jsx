import { ThemeContext } from "@/configs/Context";
// import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useContext, useEffect, useRef } from "react";

import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getTheme(theme);

  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.replace("Books");
    }, 5000);
  }, []);

  const handleNext = () => {
    router.replace("Books");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>The Song Of God</Text>
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/Welcome.json")}
        autoPlay={false}
        loop={true}
        speed={1.5}
        style={styles.lottie}
      />

      <Image
        source={{
          uri: "https://hubvxtxffzxnaoiingqj.supabase.co/storage/v1/object/public/gita-images/gita.png",
        }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleNext} style={styles.iconContainer}>
          <AntDesign name="right" size={32} color="#000" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
const getTheme = (COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "space-between",
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    image: {
      height: "60%",
      width: "100%",
      borderRadius: 8,
      overflow: "hidden",
    },
    welcome: {
      fontSize: 24,
      fontWeight: "600",
      textAlign: "center",
      marginVertical: 16,
      color: COLORS.textPrimary,
    },
    lottie: {
      width: 300,
      height: 100,
      alignSelf: "center",
    },
    iconContainer: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.backgroundLight,
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
