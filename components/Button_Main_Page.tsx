import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    marginAbove?: number|DimensionValue;
    color?: string;
    labelColor?: string;
    onPress?: () => void;
}

export default function Button({label, marginAbove, color, labelColor, onPress}: Props) {
  return(
    <View style={{...styles.buttonContainer, marginTop: marginAbove}}>
      <Pressable 
        style={{...styles.button, backgroundColor: color}}
        onPress={onPress}
      >
        <Text style={{...styles.buttonLabel, color: labelColor}}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 60,
    marginHorizontal: 20,
    alignItems: "center",
    padding: 4
  },
  button: {
    borderRadius: 16,
    borderWidth:  4,
    borderColor: "#000000",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonLabel: {
    color: "#000000",
    fontSize: 16
  }
})