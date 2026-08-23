import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Taking_Picture() {
    const[facing, setFacing] = useState<CameraType|undefined>("back");
    const[permission, requestPermission] = useCameraPermissions();
    let cameraRef = useRef<CameraView|null>(null);

    if (!permission) return <View />;

    if (!permission.granted) {
    }
    
    function toggleCameraFacing() {
        setFacing(current => (current === "back" ? "front" : "back"));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({quality: 0.5, base64: false});
                
                router.back()
                router.setParams({ imageUri: photo.uri })
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}/>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </Pressable>
                <Pressable style={styles.takePictureButton} onPress={takePicture}>
                    <View style={styles.takePictureButtonCore} />
                </Pressable>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center"
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 5,
        position: "absolute",
        bottom: 0,
        flexDirection: "column",
        backgroundColor: "#ffffff",
        width: "100%",
        height: 280,
        paddingHorizontal: 64,
        alignItems: "center"
    },
    takePictureButton: {
        borderRadius: 16,
        borderColor: "#000000",
        borderWidth: 4,
        backgroundColor: "#ffffff",
        width: "30%",
        height: "30%",
        marginTop: "5%",
        alignItems: "center",
        justifyContent: "center" 
    },
    button: {
        borderColor: "#000000",
        borderWidth: 4,
        borderRadius: 16,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        marginTop: "10%",
        width: "40%",
        height: "40%"
    },
    text: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000"
    },
    takePictureButtonCore: {
        width: "50%",
        height: "50%",
        backgroundColor: "#000000",
        borderRadius: 8
    }
});
