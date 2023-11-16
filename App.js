import { useState } from "react"
import { StyleSheet, View } from "react-native"
import Header from "./components/header"
import GameOverScreen from "./components/screens/gameOverScreen"
import GameScreen from "./components/screens/gameScreen"
import StartGameScreen from "./components/screens/startGameScreen"

export default function App() {
   const [userNumber, setUserNumber] = useState(null)
   const [guessRounds, setGuessRounds] = useState(0)

   const startGameHandler = (selectedNumber) => {
      setUserNumber(selectedNumber)
      setGuessRounds(0)
   }

   const gameOverHandler = (numOfRounds) => {
      setGuessRounds(numOfRounds)
   }

   const configureNewGameHandler = () => {
      setGuessRounds(0)
      setUserNumber(null)
   }

   const renderContent = () => {
      if (userNumber !== null && guessRounds === 0)
         return (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
         )
      else if (guessRounds > 0)
         return (
            <GameOverScreen
               numberOfRounds={guessRounds}
               userNumber={userNumber}
               onNewGame={configureNewGameHandler}
            />
         )
      else return <StartGameScreen onStartGame={startGameHandler} />
   }

   return (
      <View style={styles.screen}>
         <Header title="Guess a Number" />
         {renderContent()}
      </View>
   )
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
   },
})
