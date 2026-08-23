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

    let imageTensor = decodeJpeg(
      new Uint8Array(imageData)
    ).toFloat();

    const processed = tf.tidy(() => {
      const [h, w] = imageTensor.shape.slice(0, 2);
      const side = Math.max(h, w);
      const padH = side - h, padW = side - w;
      const top = Math.floor(padH / 2), bottom = padH - top;
      const left = Math.floor(padW / 2), right = padW - left;

      let x: any = tf.mirrorPad(
        imageTensor,
        [[top, bottom], [left, right], [0, 0]],
        "reflect"
      );

      let cur = x;
      while (cur.shape[0] > 224 * 2 && cur.shape[1] > 224 * 2) {
        const next = tf.tidy(() => tf.avgPool(cur.expandDims(0), 2, 2, "valid").squeeze([0]));
        cur.dispose();
        cur = next;
      }
      const resized = tf.image.resizeBilinear(cur, [224, 224], false, true);
      cur.dispose();

      return resized; // was `return x`
  });
    const inputTensor = tf.tidy(() =>
      processed.div(255).expandDims(0)
    );

    processed.dispose();

    return inputTensor;
  }

  useEffect (() => {
    async function prepare() {
      await tf.setBackend("cpu")
      await tf.ready();
      const model = await tf.loadGraphModel(
        bundleResourceIO(
          require("../assets/model/IR_model/model.json"),
          [
            require("../assets/model/IR_model/group1-shard1of6.bin"),
            require("../assets/model/IR_model/group1-shard2of6.bin"),
            require("../assets/model/IR_model/group1-shard3of6.bin"),
            require("../assets/model/IR_model/group1-shard4of6.bin"),
            require("../assets/model/IR_model/group1-shard5of6.bin"),
            require("../assets/model/IR_model/group1-shard6of6.bin"),
          ]
        ));

      const inputTensor = await preprocess(imageUri);
      const outputTensor = model.execute(inputTensor, ["Identity"]) as tf.Tensor;
      const probs = tf.softmax(outputTensor)

      const probsArray = await probs.array() as number[][];
      console.log("LOGITS:", await outputTensor.array());
      console.log((probsArray[0][0] * 100).toFixed(2));
      console.log(
        "PROBABILITIES:",
        await probs.array()
      );

      const InfectedProb = String((probsArray[0][0] * 100).toFixed(2));
      const noInfectedProb = String((probsArray[0][1] * 100).toFixed(2));
      router.replace({
        pathname: "/result",
        params: {
          infections: InfectedProb,
          no_Infections: noInfectedProb,
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
        <Text style={styles.textStyle}>Analysing Image...</Text>
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