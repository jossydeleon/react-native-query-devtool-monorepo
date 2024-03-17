import React, { useEffect, useState } from "react";

import { Animated, StyleSheet, Text } from "react-native";

interface Props {
  message: string;
  duration?: number;
}

const Toast: React.FC<Props> = ({ message, duration = 5000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      timeoutId = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, duration);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 5,
    padding: 10,
    zIndex: 99,
  },
  message: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});

export default Toast;
