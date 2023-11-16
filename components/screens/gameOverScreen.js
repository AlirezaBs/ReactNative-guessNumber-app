import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"

export default function GameOverScreen({
   numberOfRounds,
   userNumber,
   onNewGame,
}) {
   return (
      <View style={styles.screen}>
         <Text>The Game is Over!</Text>
         <Text>Number of rounds: {numberOfRounds}</Text>
         <Text>Number was: {userNumber}</Text>
         <Button title="New Game" onPress={onNewGame} />
      </View>
   )
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
})
