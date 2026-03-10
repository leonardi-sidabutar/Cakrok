import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";

export default function Search() {
  return (
    <View style={styles.search}
    >
        <Icon name="search" size={20} color={"#777"} />
        <Text style={{ marginLeft: 5, color: "#999" }}>Cari Menu...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    search:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%  ",
        height: "45",
        borderWidth: 1.5,
        borderColor: "#ff6817",
        borderRadius: 45,
        marginBottom: 10,
        paddingHorizontal: 10,        
    }
})