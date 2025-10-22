import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useContext, useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import ThemeProvider, { ThemeContext } from "../configs/Context";

function ThemedLayout() {
  const { theme } = useContext(ThemeContext);
  const rotationRef = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   Animated.timing(rotationRef, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }, []);
  const rotate = rotationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleSettingsClick = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    rotationRef.setValue(0);
    Animated.timing(rotationRef, {
      toValue: 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Navigate after animation ends
      router.push("/Settings");
    });
  };
  if (!theme) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={theme.statusBarStyle}
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="Books"
          options={{
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.textPrimary,
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={handleSettingsClick}
                  style={{ marginRight: 15 }}
                >
                  <Animated.View style={[{ transform: [{ rotate: rotate }] }]}>
                    <Ionicons name="settings" size={24} color={theme.primary} />
                  </Animated.View>
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="Chapters"
          options={{
            headerTintColor: theme.textPrimary,
            headerStyle: { backgroundColor: theme.background },
          }}
        />
        <Stack.Screen
          name="Verses"
          options={{
            headerTintColor: theme.textPrimary,
            headerStyle: { backgroundColor: theme.background },
          }}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerTintColor: theme.textPrimary,
            headerStyle: { backgroundColor: theme.background },
          }}
        />
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}
