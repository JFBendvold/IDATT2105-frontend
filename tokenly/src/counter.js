import { reactive } from 'vue'

export function useCounter(initialCount = 0) {
  const state = reactive({ count: initialCount })

  function increment() {
    state.count++
  }

  function decrement() {
    state.count--
  }

  return { count: state.count, increment, decrement }
}
