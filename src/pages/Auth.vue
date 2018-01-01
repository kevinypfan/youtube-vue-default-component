<template lang="html">
  <div>
    <div class="auth-container">
      <h1>{{ authMode === 'Signup' ? 'Signup' : 'Login' }}</h1>
      <default-button
        :disabled="1>2"
        btnType="primary"
        @clicked="switchHandler"
      >
        Switch to {{ authMode === 'Signup' ? 'Login' : 'Signup' }}
      </default-button>
      <default-input
        v-for="(form, index) in formArray"
        :key="index"
        :input-config="form"
        @inputValueChanged="inputValueHandler"
        @onInputFocus="inputFocusHandler"
      />
      <default-button
        :disabled="!forms.comfirm.valid && authMode === 'Signup' || !forms.name.valid && authMode === 'Signup' || !forms.email.valid || !forms.password.valid"
        btnType="success"
        @clicked="submitHandler"
      >
        Submit
      </default-button>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import validate from '../utility/validation'

import DefaultInput from '../components/UI/DefaultInput.vue'
import DefaultButton from '../components/UI/DefaultButton.vue'

export default {
  components: {
    DefaultInput,
    DefaultButton
  },
  data () {
    return {
      authMode: 'Signup',
      forms: {
        email: {
          elConfig: {
            type: 'email',
            label: "電子信箱"
          },
          value: '',
          onFocus: false,
          touched: false,
          valid: false,
          validation: {
            required: true,
            isEmail: true
          }
        },
        password: {
          elConfig: {
            type: 'password',
            label: "密碼"
          },
          value: '',
          onFocus: false,
          touched: false,
          valid: false,
          validation: {
            required: true,
            minLength: 6,
            maxLength: 10
          }
        },
        comfirm: {
          elConfig: {
            type: 'password',
            label: "確認密碼"
          },
          value: '',
          onFocus: false,
          touched: false,
          valid: false,
          validation: {
            required: true,
            equalTo: "password"
          }
        },
        name: {
          elConfig: {
            type: 'text',
            label: "姓名"
          },
          value: '',
          onFocus: false,
          touched: false,
          valid: false,
          validation: {
            required: true
          }
        }
      }
    }
  },
  computed: {
    formArray () {
      let array = []

      for (let key in this.forms) {
        array.push({
          id: key,
          config: this.forms[key]
        })
      }

      if (this.authMode !== 'Signup') {
        let loginForms = ['email', 'password']

        return array.filter(ary => {
          let flag = false
          for(let key of loginForms) {
            flag = flag || ary.id === key
          }
          return flag
        })
      }

      return array
    }
  },
  methods: {
    inputValueHandler (value, id) {
      let connectedValue = {}

      if (id === 'password') {
        connectedValue = {
          ...connectedValue,
          equalTo: value
        }
      }

      if (this.forms[id].validation.equalTo) {
        const equalControl = this.forms[id].validation.equalTo;
        const equalValue = this.forms[equalControl].value;
        connectedValue = {
          ...connectedValue,
          equalTo: equalValue
        }
      }

      let newForms = {
        ...this.forms,
        comfirm: {
          ...this.forms.comfirm,
          valid: id === 'password' ?
            validate(this.forms.comfirm.value, this.forms.comfirm.validation, connectedValue)
            : this.forms.comfirm.valid
        },
        [id]: {
          ...this.forms[id],
          value,
          touched: true,
          valid: validate(value, this.forms[id].validation, connectedValue)
        }
      }
      this.forms = newForms
    },
    inputFocusHandler (bool, id) {
      let newForms = {
        ...this.forms,
        [id]: {
          ...this.forms[id],
          onFocus: bool
        }
      }
      this.forms = newForms
    },
    switchHandler () {
      this.authMode = this.authMode === 'Signup' ? 'Login' : 'Signup'
    },
    submitHandler () {
      console.log('wubmit')
    }
  }
}
</script>

<style lang="css" scoped>

.auth-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  border: 1px solid #ccc;
  padding: 30px;
  background-color: rgba(230,230,230, .9);
  border-radius: 6px;
  text-align: center;
  box-shadow: 1px 1px 1px 3px #bbb;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  background: url(../assets/bgc.jpg) no-repeat center center fixed;
  height: 100vh;
  width: 100vw;
  z-index: -999;
  filter: blur(3px);
}
</style>
