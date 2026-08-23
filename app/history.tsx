import { Directory, File, Paths } from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface History {
  date: string,
  time: string,
  status: string,
  likelihood: string,
  image: string,
}

export default function History_Log() {
  const { refresh } = useLocalSearchParams();
  const [log, setLog] = useState<History[]>([])
  const file = new File(Paths.document, "history_log.json");
  const getLog = async () => {    
    !file.exists && file.create();
    const content = await file.text();
    setLog(content ? JSON.parse(content) : []);
  }

  useEffect(() => {
    getLog();
  }, [refresh, getLog]);
  
  return (
    <ScrollView>
      {log.map((singleHistory: History) => {
        const imageDir = new Directory(Paths.document, "images");
        const imageFile = new File(imageDir, singleHistory.image);
        const infection = singleHistory.status === "Infected";
        const textStyle = infection ? style.infected : style.notInfected;

        return (
          <View key={singleHistory.image}>
            <View style={{flexDirection: "row", borderWidth: 1}}>
              <Image
                source={{uri: imageFile.uri}} 
                style={{width: 150, height:150, borderWidth: 2}}
              />

              <View style={style.historyColumn}>
                <Text style={style.headerText}>
                  Date: {singleHistory.date} {singleHistory.time}
                </Text>
                <Text style={style.rowText}>
                  Status: <Text style={textStyle}>{singleHistory.status}</Text>
                </Text>
                <Text style={style.rowText}>
                  Likelihood: <Text style={textStyle}>{singleHistory.likelihood}</Text>
                </Text>
              </View>
            </View>
          </View>
          )
        }
      )}
    </ScrollView>
  )
};

const style = StyleSheet.create({
  historyColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: 12
  },
  infected: {
    color: "#ff0000"
  },
  notInfected: {
    color: "#00ff00"
  },
  headerText: {
    fontSize: 16,
    marginTop: 4
  },
  rowText: {
    fontSize: 16,
    marginTop: 8
  }
})