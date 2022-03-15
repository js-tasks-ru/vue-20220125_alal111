<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="clasesImage" :style="{'--bg-url': currenImg ? `url(${currenImg})` : null}" @click="removeImage" >
      <span  class="image-uploader__text">{{ textImage }}</span>
      <input ref="inputImage" v-bind="$attrs" type="file" accept="image/*" class="image-uploader__input"   @change="loadImage"   />
    </label>

  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function
  },
  emits: ['remove', 'upload', 'error', 'select'],
  data(){
    return {
      loading: false,
      currenImg: this.preview,
      stateText: {
        loaded: 'Удалить изображение',
        empty: 'Загрузить изображение',
        loading: 'Загрузка...',
      }
    }
  },
  computed: {
    textImage(){

      if(!this.currenImg && !this.loading){

        return this.stateText.empty;
      }
      else if(this.loading){
        return this.stateText.loading;
      }
      return this.stateText.loaded;
    },
    clasesImage(){
      return {
        'image-uploader__preview-loading': Boolean(this.loading),
      }
    },

  },
  watch: {
    preview(newVal){
      this.currenImg = newVal;
    }
  },
  methods: {
    removeImage(e){
      this.$refs.inputImage.value = '';
      if(this.currenImg && !this.loading){
        e.preventDefault();
        this.currenImg = null;
        this.$emit('remove');
      }

    },
    async loadImage(e){
      const file = e.target.files[0];

      this.$emit('select', file);

      if(this.uploader){
        this.loading = true;

        await this.uploader(file)
                .then(data => {
                  this.loading = false;
                  this.$emit('upload', data)
                })
                .catch(err => {
                  this.loading = false;
                  this.$emit('error', err)
                  e.target.value = '';
                })
      }
      else{
        this.currenImg = URL.createObjectURL(file);
      }

    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
