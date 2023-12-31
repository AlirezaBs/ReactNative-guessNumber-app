import React from "react"
import { StyleSheet, Text, View } from "react-native"
import colors from "../constants/colors"

export default function NumberContainer({text}) {
   return (
      <View style={styles.container}>
         <Text style={styles.number}>{text}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      borderWidth: 2,
      borderColor: colors.accent,
      padding: 10,
      borderRadius: 10,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
   },
   number: {
      color: colors.accent,
      fontSize: 22,
   },
})
