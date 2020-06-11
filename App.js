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
  const [ballX, setBallX] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ballY, { //Animated.spring
          duration: 500,
          toValue: 200,
          useNativeDriver: false,
        }),

        Animated.delay(1000),

        Animated.timing(ballX, {
          duration: 500,
          toValue: 200,
          useNativeDriver: false,
        }),

        Animated.delay(1000),

        Animated.timing(ballY, {
          toValue: 0,
          duration: 500
        }),

        Animated.delay(1000),

        Animated.timing(ballY, {
          duration: 500,
          toValue: 200,
          useNativeDriver: false,
        }),
      ]), {
      iterations: 2,
    }
    ).start()
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[
          styles.ball,
          { top: ballY, left: ballX }
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
