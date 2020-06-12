import React, { useState } from "react";

import {
  View,
  Image,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated
} from "react-native";

import User from "./components/User";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const App = () => {
  const [listProgress] = useState(new Animated.Value(0))
  const [userInfoProgress] = useState(new Animated.Value(0))
  const [scrollOffset] = useState(new Animated.Value(0))
  const [userSelected, setUserSelected] = useState(null)
  const [userInfoVisible, setUserInfoVisible] = useState(false)
  const [users] = useState([
    {
      id: 1,
      name: "Diego Fernandes",
      description: "Head de programação!",
      avatar: "https://avatars0.githubusercontent.com/u/2254731?s=460&v=4",
      thumbnail:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
      likes: 200,
      color: "#57BCBC"
    },
    {
      id: 2,
      name: "Robson Marques",
      description: "Head de empreendedorismo!",
      avatar: "https://avatars2.githubusercontent.com/u/861751?s=460&v=4",
      thumbnail:
        "https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80",
      likes: 350,
      color: "#E75A63"
    },
    {
      id: 3,
      name: "Cleiton Souza",
      description: "Head de mindset!",
      avatar: "https://avatars0.githubusercontent.com/u/4669899?s=460&v=4",
      thumbnail:
        "https://images.unsplash.com/photo-1506440905961-0ab11f2ed5bc?auto=format&fit=crop&w=400&q=80",
      likes: 250,
      color: "#2E93E5"
    },
    {
      id: 4,
      name: "Robson Marques",
      description: "Head de empreendedorismo!",
      avatar: "https://avatars2.githubusercontent.com/u/861751?s=460&v=4",
      thumbnail:
        "https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80",
      likes: 350,
      color: "#E75A63"
    }
  ])

  const selectUser = user => {
    setUserSelected(user)
    Animated.sequence([
      Animated.timing(listProgress, {
        toValue: 100,
        duration: 300
      }),
      Animated.timing(userInfoProgress, {
        toValue: 100,
        duration: 500
      })
    ]).start(() => setUserInfoVisible(true))
  };

  const renderDetail = () => (
    <View>
      <User user={userSelected} onPress={() => { }} />
    </View>
  );

  renderList = () => (
    <Animated.View style={[
      styles.container,
      {
        transform: [
          {
            translateX: listProgress.interpolate({
              inputRange: [0, 100],
              outputRange: [0, width]
            })
          }
        ]
      }
    ]}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: { y: scrollOffset }
          }
        }])}
      >
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            onPress={() => selectUser(user)}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[
        styles.header,
        {
          height: scrollOffset.interpolate({
            inputRange: [0, 140],
            outputRange: [200, 70],
            extrapolate: 'clamp'
          })
        }
      ]}>
        <Animated.Image
          style={[
            styles.headerImage,
            {
              opacity: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1]
              })
            }
          ]}
          source={userSelected ? { uri: userSelected.thumbnail } : null}
        />
        <Animated.Text style={[
          styles.headerText,
          {
            fontSize: scrollOffset.interpolate({
              inputRange: [120, 140],
              outputRange: [30, 16],
              extrapolate: 'clamp'
            }),
            transform: [{
              translateX: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width]
              })
            }]
          }
        ]}>
          GoNative
        </Animated.Text>
        <Animated.Text style={[
          styles.headerText,
          {
            transform: [{
              translateX: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [width * -1, 0]
              })
            }]
          }
        ]}>
          {userSelected ? userSelected.name : null}
        </Animated.Text>
      </Animated.View>
      {userInfoVisible ? renderDetail() : renderList()}
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingHorizontal: 15,
    backgroundColor: "#2E93E5",
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject
  },

  headerText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFF",
    backgroundColor: "transparent",
    position: "absolute",
    left: 15,
    bottom: 20
  }
});

export default App;