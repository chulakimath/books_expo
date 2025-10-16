
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';


export default function Layout() {
  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      <Stack>
        <Stack.Screen name="WelcomeScreen" options={{ headerShown: false}} />
        <Stack.Screen name="index" options={{ title: 'Books' }} />
        <Stack.Screen name="Chapters" options={{ headerShown: true }} />
        <Stack.Screen name="Verses" options={{ headerShown: true }} />
      </Stack>
    </>
  );
}
