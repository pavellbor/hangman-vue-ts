import { ref, computed, type Ref } from "vue"

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed(() => letters.value.filter((x) => word.value.includes(x)))
  const wrongLetters = computed(() => letters.value.filter((x) => !word.value.includes(x)))
  const isLose = computed(() => wrongLetters.value.length === 6)
  const isWin = computed(() => [...word.value].every((x) => correctLetters.value.includes(x)))
  const addLetter = (key: string) => {
    if (/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key.toLowerCase())
    }
  }
  const resetLetters = () => {
    letters.value = []
  }

  return {
    letters,
    correctLetters,
    wrongLetters,
    isLose,
    isWin,
    addLetter,
    resetLetters
  }
}