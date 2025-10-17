
import COLORS from '@/configs/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';


export default function Layout() {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="dark-content" />
      <Stack>
        {/* <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} /> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Books" options={{
          headerStyle: { backgroundColor: COLORS.background },
        }} />
        <Stack.Screen name="Chapters" options={{
          headerStyle: { backgroundColor: COLORS.background },
        }} />
        <Stack.Screen name="Verses" options={{
          headerStyle: { backgroundColor: COLORS.background },
        }} />
      </Stack>
    </>
  );
}
