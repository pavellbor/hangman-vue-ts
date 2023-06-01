import GameNotification from '../components/GameNotification.vue'
import { ref } from "vue"

export const useNotification = () => {
  const notification = ref<InstanceType<typeof GameNotification> | null>(null)
  const showNotification = () => {
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)
  }

  return {
    notification,
    showNotification
  }
}