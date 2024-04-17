import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack>
      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </>
  );
};

export default _layout;
