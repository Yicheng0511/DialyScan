import Button from "@/components/Button_Main_Page";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function Select_Image_Type() {

    const IR_push = (): void => {
        router.push({pathname: "/image_picker", params: {Image_Type: "IR"}})
    }

    const RGB_push = (): void => {
        router.push({pathname: "/image_picker", params: {Image_Type: "RGB"}})
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.question}>
                <Text style={styles.text}>Are you scanning a RGB image or IR image?</Text>
            </View>
            <Button
                label="IR Photo"
                color="#ffffff"
                onPress={IR_push}
            />
            <Button
                label="RGB Photo"
                color="#ffffff"
                onPress={RGB_push}
            />
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
  question: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
    marginHorizontal: "5%",
    borderRadius: 16,
    borderWidth: 4
  },
  imageStyle: {
    borderWidth: 4,
    borderColor: "#2222ff",
    width: 340,
    height: 120,
    borderRadius: 16,
    marginBottom: "10%",
  },
  text: {
    textAlign: "center",
    color: "#000000",
    fontSize: 32
  }
});