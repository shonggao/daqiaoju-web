const loginMin = {
  methods: {
    isLogin () {
      var storage = window.sessionStorage
      var isLogin = storage.getItem('isLogin')
      console.log(isLogin)
      if (!isLogin) {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.isLogin()
  }
}

export default loginMin
