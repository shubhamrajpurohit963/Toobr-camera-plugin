import {RNCamera} from 'react-native-camera';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Camera = props => {
  var camera = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.recordAsync(options);
      console.log(data.uri);
      props.setUrl(data.uri);
    }
  };

  const endRecording = async () => {
    props.setShowCamera(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.setShowCamera(false)}
        style={styles.closeIcon}>
        <Icon name="close" size={30} color="grey" />
      </TouchableOpacity>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        onRecordingEnd={() => props.setShowCamera(false)}
        onRecordingStart={() => setIsRecording(true)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        // onGoogleVisionBarcodesDetected={({barcodes}) => {
        //   console.log(barcodes);
        // }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        {isRecording ? (
          <TouchableOpacity onPress={endRecording} style={styles.capture}>
            <Icon name="stop" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Icon name="video-camera" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 100,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default Camera;
