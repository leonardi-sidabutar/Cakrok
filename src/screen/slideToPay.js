import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';

const BUTTON_WIDTH = 300;
const SLIDER_SIZE = 60;

export default function SlideToPay() {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        if (
          gestureState.dx > 0 &&
          gestureState.dx < BUTTON_WIDTH - SLIDER_SIZE
        ) {
          translateX.setValue(gestureState.dx);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > BUTTON_WIDTH - SLIDER_SIZE - 20) {
          Alert.alert('Pembayaran Berhasil ✅');
        }

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Text style={styles.text}>Geser untuk Bayar</Text>

        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX }] },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: BUTTON_WIDTH,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  slider: {
    width: SLIDER_SIZE,
    height: SLIDER_SIZE,
    backgroundColor: '#1e90ff',
    borderRadius: SLIDER_SIZE / 2,
  },
});
