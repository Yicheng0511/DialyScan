import Button from "@/components/Button_Clear_History";
import { Stack } from "expo-router";

export default function rootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{title: "DialyScan", headerTitleAlign: "center"}} />
    <Stack.Screen name="image_picker" options={{title: "Pick an image", headerTitleAlign: "center"}} />
    <Stack.Screen name="camera" options={{title: "Camera", headerTitleAlign: "center"}} />
    <Stack.Screen name="secretion_learning" options={{title: "Analysing Secretions...", headerTitleAlign: "center"}} />
    <Stack.Screen name="result" options={{title: "Result", headerTitleAlign: "center"}} />
    <Stack.Screen name="history" options={{
      title: "History Logs",
      headerTitleAlign: "center",
      headerRight: () => (<Button/>)
    }} />
  </Stack>
}
