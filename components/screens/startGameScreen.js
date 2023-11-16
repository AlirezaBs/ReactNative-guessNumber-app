import React, { useState } from "react"
import {
   Alert,
   Button,
   Keyboard,
   StyleSheet,
   Text,
   TouchableWithoutFeedback,
   View,
} from "react-native"
import colors from "../../constants/colors"
import Card from "../card"
import Input from "../input"
import NumberContainer from "../numberContainer"

export default function StartGameScreen({ onStartGame }) {
   const [enteredValue, setEnteredValue] = useState("")
   const [confirmed, setConfirmed] = useState(false)
   const [selectedNumber, setSelectedNumber] = useState(null)

   const numberInputHandler = (inputText) => {
      setEnteredValue(inputText.replace(/[^0-9]/g, ""))
   }

   const resetInputHandler = () => {
      setEnteredValue("")
      setConfirmed(false)
   }

   const confirmInputHandler = () => {
      const chosenNumber = parseInt(enteredValue)
      if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
         Alert.alert(
            "Invalid number!",
            "Number has to be a number between 1 and 99.",
            [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
         )
         return
      }

      Keyboard.dismiss()
      setConfirmed(true)
      setSelectedNumber(chosenNumber)
      setEnteredValue("")
   }

   const startGameHandler = () => {
      onStartGame(selectedNumber)
   }

   let confirmedOutput
   if (confirmed) {
      confirmedOutput = (
         <Card style={styles.summaryContainer}>
            <Text>You selected:</Text>
            <NumberContainer text={selectedNumber} />
            <Button title="START GAME" onPress={startGameHandler} />
         </Card>
      )
   }

   return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
         <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>

            <Card style={styles.inpoutContainer}>
               <Text>Select a Number</Text>
               <Input
                  style={styles.input}
                  blurOnSubmit
                  placeholder="00"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  value={enteredValue}
                  onChangeText={numberInputHandler}
               />
               <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                     <Button
                        title="Reset"
                        onPress={resetInputHandler}
                        color={colors.accent}
                     />
                  </View>
                  <View style={styles.button}>
                     <Button
                        title="Confirm"
                        onPress={confirmInputHandler}
                        color={colors.primary}
                     />
                  </View>
               </View>
            </Card>
            {confirmedOutput}
         </View>
      </TouchableWithoutFeedback>
   )
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      justifyContent: "flex-start",
   },
   title: {
      fontSize: 20,
      marginVertical: 10,
      fontWeight: "bold",
   },
   inpoutContainer: {
      width: 300,
      maxWidth: "80%",
      alignItems: "center",
   },
   buttonContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 15,
   },
   button: {
      width: 100,
   },
   input: {
      width: 50,
      textAlign: "center",
   },
   summaryContainer: {
      marginTop: 20,
      alignItems: "center",
   },
})
