<template>
  <the-toaster ref="toaster" />
  <p>
    <button @click="success">Add Success Message</button>
    <button @click="error">Add Error Message</button>
    <button @click="custom">Add Custom</button>
  </p>
</template>

<script>
import TheToaster from './components/TheToaster';

export default {
  name: 'App',

  components: { TheToaster },

  methods: {
    success() {

      this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString());
    },

    error() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
    },
    custom() {
      this.$refs.toaster.customToast('Error ' + new Date().toLocaleTimeString(), 'warning', 'pill-active', 1000);
    },
  },
};
</script>

<style></style>
