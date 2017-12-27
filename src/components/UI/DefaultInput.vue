<template lang="html">
  <div class="input-container">
    <label :for="inputConfig.id">
      <input class="input-style"
        :type="inputConfig.config.elConfig.type"
        :id="inputConfig.id"
        :value="inputConfig.config.value"
        @input="updateValue($event, inputConfig.id)"
        :class="{invalid: !inputConfig.config.valid && !inputConfig.config.onFocus && inputConfig.config.touched}"
        @focus="onFocus(inputConfig.id)"
        @blur="onBlur(inputConfig.id)"
      >
      <p
        class="text-style"
        :class="{'text-animate': inputConfig.config.onFocus || inputConfig.config.touched}"
        >
        {{inputConfig.config.elConfig.label}}
      </p>
    </label>
  </div>
</template>

<script>
export default {
  props: ['inputConfig'],
  methods: {
    updateValue (event, id) {
      this.$emit('inputValueChanged', event.target.value, id)
    },
    onFocus (id) {
      this.$emit('onInputFocus', true, id)
    },
    onBlur (id) {
      this.$emit('onInputFocus', false, id)
    }
  }
}
</script>

<style lang="css" slot-scoped>
.input-container{
  margin-top: 20px;
  text-align: initial;
}
.input-style {
  width: 100%;
  padding: 10px 12px;
  margin: 8px 0;
  box-sizing: border-box;
  line-height: 1.5;
  color: #555555;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: .2s
}

.text-style {
  position: absolute;
  transform: scale(1) translate(10px, -54px);
  color: #ccc;
  transition: .2s
}

.text-animate {
  transform: scale(.8) translate(0, -114px);
  color: #333;
}

.invalid {
  background-color: #f9c0c0;
  border-color: red;
}
</style>
