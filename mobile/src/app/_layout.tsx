import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="box" />
      </Stack>

      <StatusBar style="auto" />
    </>
  )
}

export default RootLayout
