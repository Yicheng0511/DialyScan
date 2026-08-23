import Button from "@/components/Button_Main_Page";
import ImageViewer from "@/components/Image_Viewer";
import { Directory, File, Paths } from "expo-file-system";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Result() {
  const { infections, no_Infections, imageUri } = useGlobalSearchParams<{
    infections: string,
    no_Infections: string,
    imageUri: string
  }>();

  const float_Infections = Number(infections);
  const float_No_Infections = Number(no_Infections);
  const date_Array = Date().split(" ")
  const time_Array = date_Array[4].split(":");
  const isInfected = float_Infections > float_No_Infections;
  const infectedStyle = isInfected ? style.infected : style.notInfected;
  const infectedProb = isInfected ? `Infected (${float_Infections}%)` : `Not Infected (${float_No_Infections}%)`;

  const logDetails = {
    date: `${date_Array[2]} ${date_Array[1]} ${date_Array[3]}`,
    time: `${time_Array[0]}:${time_Array[1]}`,
    status: float_Infections > float_No_Infections ? "Infected" : "Not Infected",
    likelihood: `${float_Infections}%`,
    image: imageUri.split("/").pop()
  };

  const logEvent = async (details: object) => {
    const file = new File(Paths.document, "history_log.json");
    const imageSrc = new File(imageUri);
    const imageDir = new Directory(Paths.document, "images");
    const imageSave = new File(imageDir, imageUri.split("/").pop() as string);
    let logs = [];

    if (!file.exists) {
      file.create();
    } else {
      const content = await file.text();
      logs = content ? JSON.parse(content) : [];
    };

    imageSrc.copy(imageSave);
    logs.push(details);

    file.write(JSON.stringify(logs));
    console.log(await file.text());
    alert("Log saved");
  }

  useEffect(() => {
    logEvent(logDetails);
  }, []);

  const goToHomePage = () => {
    router.replace("/")
  }

  return (
    <View style={style.container}>
      <ImageViewer selectedImage={imageUri}/>
      <View style={style.statusBar}>
        <Text style={style.textStyle}>Prediction Result:</Text>
        <Text style={infectedStyle}>{infectedProb}</Text>
      </View>
      <Button
        label="Go Back"
        color="#ffffff"
        onPress={goToHomePage}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cdefef",
    alignItems: "center",
    justifyContent: "center"
  },
  statusBar: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#000000",
    width: "80%",
    padding: 12,
    marginBottom: "10%"
  },
  textStyle: {
    color: "#000000",
    fontSize: 24,
  },
  infected: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 24
  },
  notInfected: {
    color: "#00aa00",
    fontWeight: "bold",
    fontSize: 24
  }
})
