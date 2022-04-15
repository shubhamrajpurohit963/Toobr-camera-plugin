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
import Video from 'react-native-video';
import Camera from './components/Camera';

const App = () => {
  var videoplayer = useRef(Video);
  const [showCamera, setShowCamera] = useState(false);
  const [url, setUrl] = useState(
    'file:///data/user/0/com.videorecord/cache/Camera/a13b31fd-8aea-40f7-9fbf-209cec971d30.mp4',
  );

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          backgroundColor: 'white',
          textAlign: 'center',
          fontSize: 18,
          fontStyle: 'italic',
        }}>
        Toobr Camera Test
      </Text>
      {showCamera && <Camera setShowCamera={setShowCamera} setUrl={setUrl} />}

      {!showCamera && (
        <TouchableOpacity
          onPress={() => setShowCamera(true)}
          style={{
            backgroundColor: '#eee',
            height: 50,
            width: 100,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <Text style={{fontWeight: 'bold'}}>Open Camera</Text>
        </TouchableOpacity>
      )}

      {url && !showCamera && (
        <View style={{flex: 1, marginTop: 100}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Video Preview</Text>
          <View style={{height: '80%', width: '100%'}}>
            <Video
              resizeMode="contain"
              source={{
                uri: url,
              }}
              style={styles.backgroundVideo}
            />
          </View>
        </View>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
