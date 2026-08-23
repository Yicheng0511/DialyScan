import Button from "@/components/Button_Main_Page";
import ImageViewer from "@/components/Image_Viewer";
import { launchImageLibraryAsync, } from "expo-image-picker";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Image_Picker() {
  const { imageUri } = useGlobalSearchParams<{imageUri: string}>();
  const { Image_Type } = useLocalSearchParams<{Image_Type: string}>();
  const [selectedImage, setSelectedImage] = useState<string|undefined>(undefined);

  useEffect(() => {if (imageUri) {setSelectedImage(String(imageUri))}}, [imageUri]);

  const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);
    }
  }

  const submitImage = () => {
    if (Image_Type === "IR") {
      router.dismissAll();
      router.replace({pathname: "/IR_infection_learning", params: {imageUri: selectedImage}});
    } else if (Image_Type === "RGB") {
      router.dismissAll();
      router.replace({pathname: "/RGB_infection_learning", params: {imageUri: selectedImage}});
    } else {
      alert("No Image Selected");
    }
  }

  const submitButtonColor = selectedImage ? "#44ff44" : "#bbbbbb";

  const openCamera = () => {
    router.push("/camera")
  }

  return (
    <View style={style.container}>
      <ImageViewer selectedImage={selectedImage}/>
      <Button
        label="Take Photo"
        color="#ffffff"
        onPress={openCamera}
      />
      <Button
        label="Choose from Album"
        color="#ffffff"
        onPress={pickImageAsync}
      />
      <Button
        label="Confirm"
        marginAbove={80}
        color={submitButtonColor}
        onPress={submitImage}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cdefef",
    alignItems: "center",
    justifyContent: "center"
  }
})
