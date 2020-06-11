import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder
} from 'react-native';

//Animated.View
//Animated.Text
//Animated.Image
//Animated.ScrollView

const App = () => {
  const [ball, setBall] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => true,

    onPanResponderGrant: (e, gestureState) => {
      ball.setOffset({
        x: ball.x._value,
        y: ball.y._value,
      });

      ball.setValue({ x: 0, y: 0 })
    },

    onPanResponderMove: Animated.event([null, {
      dx: ball.x,
      dy: ball.y
    }], {
      listener: (e, gestureState) => {
        console.log(gestureState)
      }
    }),

    onPanResponderRelease: () => {
      ball.flattenOffset();
    }
  })

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.ball,
            {
              transform: [
                { translateX: ball.x },
                { translateY: ball.y },
              ]
            }
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
