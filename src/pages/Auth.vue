<template lang="html">
  <div class="auth-container">
    <h1>Sign up</h1>
    <default-input
      v-for="(form, index) in formArray"
      :key="index"
      :input-config="form"
      @inputValueChanged="inputValueHandler"
    />
    <default-button
      :disabled="1>2"
      btnType="success"
    >
      Submit
    </default-button>
    <default-button
      :disabled="1>2"
      btnType="danger"
    >
      Cancel
    </default-button>
  </div>
</template>

<script>
import DefaultInput from '../components/UI/DefaultInput.vue'
import DefaultButton from '../components/UI/DefaultButton.vue'

export default {
  components: {
    DefaultInput,
    DefaultButton
  },
  data () {
    return {
      forms: {
        email: {
          elConfig: {
            type: 'email',
            placeholder: 'Enter your E-mail',
            label: "電子信箱"
          },
          value: '',
          onFacus: false,
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
            placeholder: 'Enter your password',
            label: "密碼"
          },
          value: '',
          onFacus: false,
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
            placeholder: 'Enter your password again',
            label: "確認密碼"
          },
          value: '',
          onFacus: false,
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
            placeholder: 'Enter your Name',
            label: "姓名"
          },
          value: '',
          onFacus: false,
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
      return array
    }
  },
  methods: {
    inputValueHandler (value, id) {
      let newForms = {
        ...this.forms,
        [id]: {
          ...this.forms[id],
          value
        }
      }
      this.forms = newForms
    }
  }
}
</script>

<style lang="css" slot-scoped>
.auth-container {
  text-align: center;
}
</style>
