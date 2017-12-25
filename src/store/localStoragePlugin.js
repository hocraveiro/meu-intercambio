export default store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'setUser') {
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  })
}
