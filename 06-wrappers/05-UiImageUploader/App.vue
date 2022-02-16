<template>
  <div id="app" class="sample container">
    <ui-image-uploader
            ref="imgInput"
      :preview="image"
      :uploader="uploadImage"
      @remove="image = undefined"
      @upload="image = $event.image"
      @error="error = $event"
      @select="selected = $event"
    />
  </div>
</template>

<script>
import UiImageUploader from './components/UiImageUploader';
import { uploadImage } from './ImageService';

export default {
  name: 'App',

  components: { UiImageUploader },

  data() {
    return {
      image: undefined,
      uploadImage,
      error: null,
      selected: null
    };
  },
  methods: {

  }
};
</script>

<style>
@import '~@/assets/styles/_container.css';
</style>
