import { Directory, File, Paths } from "expo-file-system";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button() {
  const file = new File(Paths.document, "history_log.json");
  const image_Dir = new Directory(Paths.document, "images");
  const clearLog = () => {
    file.write("");
    image_Dir.delete();
    image_Dir.create();
    router.replace('/history?refresh=true');
    alert("Logs Cleared!");
  };

  return(
    <Pressable style={styles.button} onPress={clearLog}>
      <Text style={styles.buttonLabel}>Clear History</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        borderWidth:  2,
        borderColor: "#000000",
        alignItems: "center",
        padding: 4
    },
    buttonLabel: {
        color: "#000000",
        fontSize: 12
    }
})