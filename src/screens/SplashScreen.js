// src/screens/SplashScreen.js
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current; // start small
  const opacityAnim = useRef(new Animated.Value(0)).current; // start invisible

  useEffect(() => {
    // Run animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 2.5s
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/logo.png")} // 👈 put your logo here
        style={[
          styles.logo,
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // set background color
  },
  logo: {
    width: 150,
    height: 150,
  },
});
