<template>
  <button @click.prevent="$emit('update:count', ++c)">{{ c }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      c: this.count
    }
  },
  watch: {
    count(newVal){
      this.c = newVal;
    }
  }
};
</script>
