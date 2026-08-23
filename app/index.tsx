import Button from "@/components/Button_Main_Page";
import { Directory, Paths } from "expo-file-system";
import { Image } from "expo-image";
import { router } from 'expo-router';
import { StyleSheet, View } from "react-native";

export default function Index() {
  const image_Dir = new Directory(Paths.document, "images");
  if (!image_Dir.exists) {
    image_Dir.create();
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/DialyScan-Logo.png")} style={styles.imageStyle} />
      <Button label="Get Started" color="#ffffff" marginAbove={"10%"} onPress={() => {router.navigate("/ir")}} />
      <Button label="History Logs" color="#ffffff" marginAbove={"5%"} onPress={() => {router.navigate("/history")}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cdefef",
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    borderWidth: 4,
    borderColor: "#2222ff",
    width: 340,
    height: 120,
    borderRadius: 16,
    marginBottom: "10%",
  }
});
