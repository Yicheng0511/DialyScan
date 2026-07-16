import Button from "@/components/Button_Main_Page";
import ImageViewer from "@/components/Image_Viewer";
import { launchImageLibraryAsync, } from "expo-image-picker";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Image_Picker() {
  const { imageUri } = useGlobalSearchParams<{imageUri: string}>();
  const [selectedImage, setSelectedImage] = useState<string|undefined>(undefined);

  useEffect(() => {if (imageUri) {setSelectedImage(String(imageUri))}}, [imageUri]);

  const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1
    });
    !result.canceled && setSelectedImage(result.assets[0].uri)
  }

  const submitImage = () => {
    if (selectedImage) {
      router.dismissAll();
      router.replace({pathname: "/secretion_learning", params: {imageUri: selectedImage}});
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
