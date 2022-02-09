<template>
  <div class="toasts">
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
        messagesList:  []
    }
  },
  methods: {
    success(text){
      const newMsg = {
        id: new Date(),
        text,
        type: 'success',
        icon: 'check-circle'
      };
      this.messagesList.push(newMsg);
      this.hideMessage(newMsg.id)
    },
    error(text){
      const newMsg = {
        id: new Date(),
        text,
        type: 'error',
        icon: 'alert-circle'
      };
      this.messagesList.push(newMsg);
      this.hideMessage(newMsg.id)
    },
    customToast(text, type, icon, time){
      const newMsg = {
        id: new Date(),
        text,
        type,
        icon
      };
      this.messagesList.push(newMsg);
      this.hideMessage(newMsg.id, time)
    },
    hideMessage(id, time = 5000){
      setTimeout(()=> {
        this.messagesList = this.messagesList.filter(el => el.id !== id);
      }, time);

    }
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
