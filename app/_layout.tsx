import Button from "@/components/Button_Clear_History";
import { Stack } from "expo-router";

export default function rootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{title: "DialyScan", headerTitleAlign: "center"}} />
    <Stack.Screen name="ir" options={{title: "Image Type Selection", headerTitleAlign: "center"}} />
    <Stack.Screen name="image_picker" options={{title: "Pick an image", headerTitleAlign: "center"}} />
    <Stack.Screen name="camera" options={{title: "Camera", headerTitleAlign: "center"}} />
    <Stack.Screen name="IR_infection_learning" options={{title: "Analysing Image...", headerTitleAlign: "center"}} />
    <Stack.Screen name="RGB_infection_learning" options={{title: "Analysing Image...", headerTitleAlign: "center"}} />
    <Stack.Screen name="result" options={{title: "Result", headerTitleAlign: "center"}} />
    <Stack.Screen name="history" options={{
      title: "History Logs",
      headerTitleAlign: "center",
      headerRight: () => (<Button/>)
    }} />
  </Stack>
}
