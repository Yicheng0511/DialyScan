import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import placeholderImage from '../assets/images/Decal.png';

type Props = {
  selectedImage?: string
};

export default function ImageViewer({selectedImage}: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImage;

  return <Image source={imageSource} style={styles.image}/>;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
    borderRadius: 16,
    marginBottom: 40
  }
})