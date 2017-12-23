<template lang="html">
  <div class="input-container">
    <label :for="inputConfig.id">
      {{inputConfig.config.elConfig.label}}
    </label>
    <input class="input-style"
      :type="inputConfig.config.elConfig.type"
      :id="inputConfig.id"
      :value="inputConfig.config.value"
      :placeholder="inputConfig.config.elConfig.placeholder"
      @input="updateValue($event, inputConfig.id)"
    >
  </div>
</template>

<script>
export default {
  props: ['inputConfig'],
  methods: {
    updateValue (event, id) {
      this.$emit('inputValueChanged', event.target.value, id)
    }
  }
}
</script>

<style lang="css" slot-scoped>
.input-container{
  margin-top: 20px;
  text-align: center;
}
.input-style {
  width: 100%;
  padding: 6px 12px;
  margin: 8px 0;
  box-sizing: border-box;
  line-height: 1.5;
  color: #555555;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>
