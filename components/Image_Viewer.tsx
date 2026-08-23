import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

type Props = {
  selectedImage?: string
};

export default function ImageViewer({selectedImage}: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : null;

  return <Image source={imageSource} style={styles.image}/>;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
    borderRadius: 16,
    borderColor: "#000000",
    borderWidth: 4,
    marginBottom: 40,
    backgroundColor: "#cdefef"
  }
})