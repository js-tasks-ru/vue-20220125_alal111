<template>
  <div class="toasts">
    {{messagesList}}
    <UiToast
            v-for="toast in messagesList"
            :key="toast.id"
            :toast="toast"
            @close="hideMessage"
    />
  </div>
</template>

<script>

import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },
  data(){
    return{
        messagesList:  [],
        toasterID: 0,
    }
  },
  methods: {
    success(text){
      this.addToast(text, 'success', 'check-circle')
    },
    error(text){
      this.addToast(text, 'error', 'alert-circle')
    },
    customToast(text, type, icon, time){
      this.addToast(text, type, icon, time)
    },
    addToast(text, type, icon, time = 5000){
      const newMsg = {
        id: this.toasterID++,
        text,
        type,
        icon
      };
      this.messagesList.push(newMsg);
      this.hideMessage(newMsg.id, time)
    },
    hideMessage(id, time){
      setTimeout(()=> {
        this.messagesList = this.messagesList.filter(el => el.id !== id);
      }, time);

    },

  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}


</style>
