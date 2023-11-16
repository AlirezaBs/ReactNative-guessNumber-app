import React, { useEffect, useRef, useState } from "react"
import { Alert, Button, StyleSheet, Text, View } from "react-native"
import Card from "../card"
import NumberContainer from "../numberContainer"

const generateRandomBetween = (min, max, exclode) => {
   const roundedMin = Math.ceil(min)
   const roundedMax = Math.floor(max)
   const rndNum = Math.floor(
      Math.random() * (roundedMax - roundedMin) + roundedMin
   )

   while (rndNum === exclode) {
      return generateRandomBetween(roundedMin, roundedMax, exclode)
   }

   return rndNum
}

export default function GameScreen({ userChoice, onGameOver }) {
   const currentLow = useRef(1)
   const currentHigh = useRef(99)
   const [currentGuess, setCurrentGuess] = useState(() =>
      generateRandomBetween(1, 99, userChoice)
   )
   const [gameRounds, setGameRounds] = useState(0)

   const nextGuessHandler = (direction) => {
      setGameRounds((prev) => prev + 1)

      // if answer is wrong else if answer is correct
      if (
         (direction === "lower" && currentGuess < userChoice) ||
         (direction === "greater" && currentGuess > userChoice)
      ) {
         Alert.alert("Don't lie!", "You know that this is wrong...", [
            { text: "Sorry!", style: "cancel" },
         ])
         return
      } else {
         if (direction === "lower") currentHigh.current = currentGuess
         else currentLow.current = currentGuess

         const nextNum = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
         )

         setCurrentGuess(nextNum)
      }
   }

   useEffect(() => {
      if (currentGuess === userChoice) {
         Alert.alert("You Won!", "You guessed correctly!", [
            {
               text: "Okay",
               style: "destructive",
               onPress: onGameOver.bind(this, gameRounds),
            },
         ])
      }
   }, [currentGuess, userChoice, onGameOver])

   return (
      <View style={styles.screen}>
         <Text>Opponent's Guess</Text>
         <NumberContainer text={currentGuess} />
         <Card style={styles.buttonContainer}>
            <Button
               title="LOWER"
               onPress={nextGuessHandler.bind(this, "lower")}
            />
            <Button
               title="GREATER"
               onPress={nextGuessHandler.bind(this, "greater")}
            />
         </Card>
      </View>
   )
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: "center",
   },
   buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
      width: 300,
      maxWidth: "80%",
   },
})
