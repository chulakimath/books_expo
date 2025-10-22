import { useEffect, useContext, useRef } from "react";
import { StyleSheet, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/configs/Context";
import { router } from "expo-router";

import * as SplashScreen from "expo-splash-screen";

const WelcomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = getTheme(theme);
  const animationRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideFromRightAnime = useRef(new Animated.Value(10)).current;
  const slideFromLeftAnime = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      animationRef.current?.play();
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  useEffect(() => {
    Animated.timing(slideFromRightAnime, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.parallel([
      Animated.spring(slideFromLeftAnime, {
        toValue: 0,
        // duration: 1000,
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 2100);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("Books");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text
        style={[
          styles.welcome,
          { transform: [{ translateY: slideFromRightAnime }] },
        ]}
      >
        The Song Of God
      </Animated.Text>

      <Animated.Image
        source={{
          uri: "https://hubvxtxffzxnaoiingqj.supabase.co/storage/v1/object/public/gita-images/gita.png",
        }}
        style={[
          styles.image,
          { opacity: fadeAnim },
          { transform: [{ translateX: slideFromLeftAnime }] },
        ]}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const getTheme = (COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "flex-start",
      gap: "10%",
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
