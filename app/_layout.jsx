import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useContext } from "react";
import {
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import ThemeProvider, { ThemeContext } from "../configs/Context";

function ThemedLayout() {
  const { theme } = useContext(ThemeContext);
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
                  onPress={() => router.push("/Settings")}
                  style={{ marginRight: 15 }}
                >
                  <Ionicons name="settings" size={24} color={theme.primary} />
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
