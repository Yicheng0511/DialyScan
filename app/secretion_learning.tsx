import ImageViewer from "@/components/Image_Viewer";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Machine_Learning() {
  const { imageUri } = useGlobalSearchParams<{ imageUri: string }>();
  
  async function preprocess(uri: string) {
      const response = await fetch(uri);
      const imageData = await response.arrayBuffer();
      let imageTensor = decodeJpeg(new Uint8Array(imageData))
          .resizeBilinear([224, 224])
          .toFloat()
          .div(tf.scalar(255));
      const mean = [0.485, 0.456, 0.406];
      const std = [0.229, 0.224, 0.225];

      const offset = tf.tensor(mean);
      const scale = tf.tensor(std);

      imageTensor = imageTensor.sub(offset).div(scale);
      
      return imageTensor.expandDims(0)
  }

  useEffect (() => {
    async function prepare() {
      await tf.setBackend("rn-webgl");
      await tf.ready();
      const model = await tf.loadGraphModel(
        bundleResourceIO(
          require("../assets/model/secretion/model.json"),
          [
            require("../assets/model/secretion/group1-shard1of6.bin"),
            require("../assets/model/secretion/group1-shard2of6.bin"),
            require("../assets/model/secretion/group1-shard3of6.bin"),
            require("../assets/model/secretion/group1-shard4of6.bin"),
            require("../assets/model/secretion/group1-shard5of6.bin"),
            require("../assets/model/secretion/group1-shard6of6.bin")
          ]
        ));
      const inputTensor = await preprocess(imageUri);
      const outputTensor = model.execute(inputTensor, ["Identity"]) as tf.Tensor;
      const outputData = await outputTensor.data();
      const logits = tf.tensor(outputData);
      const probs = tf.softmax(logits); 
      const probsArray = await probs.array() as number[];

      console.log((probsArray[1] * 100).toFixed(2));

      const secretionProb = String((probsArray[1] * 100).toFixed(2));
      const noSecretionProb = String((probsArray[0] * 100).toFixed(2));

      router.replace({
        pathname: "/result",
        params: {
          secretions: secretionProb,
          no_Secretions: noSecretionProb,
          imageUri: imageUri,
        }
      })

      outputTensor.dispose();
      inputTensor.dispose();
      probs.dispose();
    }
    prepare();
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <ImageViewer selectedImage={imageUri}/>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Analysing Secretions...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cdefef",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderRadius: 16,
    marginHorizontal: "20%"
  },
  textStyle: {
    textAlign: "center",
    color: "#000000",
    fontSize: 32
  }
})