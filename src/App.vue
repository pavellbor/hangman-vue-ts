<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
import { computed, ref, watch } from 'vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetters, wrongLetters, isLose, isWin, addLetter, resetLetters } =
  useLetters(word)
const { notification, showNotification } = useNotification()
const popup = ref<InstanceType<typeof GamePopup> | null>(null)
const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.close()
}

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotification()
    return
  }

  addLetter(key)
})
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :wrong-letters-count="wrongLetters.length" />
    <GameWrongLetters :wrong-letters="wrongLetters" />
    <GameWord :word="word" :correct-letters="correctLetters" />
  </div>

  <GamePopup ref="popup" :word="word" @restart="restart" />
  <GameNotification ref="notification" />
</template>
