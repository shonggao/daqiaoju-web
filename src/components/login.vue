<template>
    <div class="login-container">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">大桥局大数据平台</h2>
            <el-form-item label="用户名"  prop="weixinName">
                <el-input v-model="form.weixinName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input v-model="form.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')" size="medium">登录</el-button>
                <!-- <el-button @click="register()">注册</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
  name: 'login',
  data () {
    return {
      form: {
        weixinName: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名3-5位', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '密码3-5位', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(formName)
        // console.log(valid) 验证通过为true，有一个不通过就是false
        if (valid) {
          // 通过的逻辑

          var vue = this
          // console.log(this.form)

          this.$http.post('auth/login', this.form)
            .then(Response => {
              console.log(Response)
              /* eslint-disable-next-line */
            if (Response.status == 201) {
                console.log(Response)
                console.log(vue)
                var storage = window.sessionStorage
                storage.setItem('isLogin', true)
                storage.setItem('userId', Response.data.data.userInfo._id)
                storage.setItem('userRole', Response.data.data.userInfo.role)
                storage.setItem('weixinName', Response.data.data.userInfo.weixinName)
                storage.setItem('token', Response.data.data.access_token)
                // vue.$store.commit('setLogin', true)
                // vue.$store.commit('setUserInfo', Response.data.data.userInfo)
                // vue.$store.commit('setToken', Response.data.data.access_token)
                vue.$router.push('/main')
              }
            }).catch(error => {
              console.log(error)
              vue.$message({
                type: 'error',
                message: '用户名密码错误',
                duration: 2000
              })
              console.log('用户名密码错误')
            })
          // console.log(res)
        } else {
          vue.$message({
            type: 'error',
            message: '用户名和密码不能为空',
            duration: 2000
          })
          console.log('用户名和密码不能为空')
        }
      }, this)
    },
    register () {
      this.$router.push('./register')
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: RGB(64,158,230,0.7); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: black; */
  background-image: url('../assets/img/timg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 0 2px #eee;
}

/* 标题 */
.login-title {
  color:white;
  text-align: center;
}
</style>
