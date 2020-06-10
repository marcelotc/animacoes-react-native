import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet
} from 'react-native';

//Animated.View
//Animated.Text
//Animated.Image
//Animated.ScrollView

const App = () => {
  const [ballY, setBallY] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.decay(ballY, { //Animated.spring
      //toValue: 300,
      //bounciness: 20,
      velocity: 1,
      useNativeDriver: false,
    }).start()
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[
          styles.ball,
          { top: ballY }
        ]}></Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f00'
  }
})

export default App;
