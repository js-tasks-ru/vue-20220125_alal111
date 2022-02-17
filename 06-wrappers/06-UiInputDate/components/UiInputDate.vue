<template>
  <ui-input :type="type" v-model="inputValue">
    <template v-if="$slots['left-icon']"  #left-icon>
      <slot name="left-icon"></slot>
    </template>
    <template v-if="$slots['right-icon']"  #right-icon>
      <slot name="right-icon"></slot>
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import moment from 'moment'
export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['date', 'time', 'datetime-local'].indexOf(value) !== -1
      },

    },
    modelValue: {
      type: Number,
      default: null
    }
  },
  emits: ['update:modelValue'],

  computed: {
    inputValue: {
      get(){
        if(this.modelValue !== null){
          if(this.type === 'date'){
            return moment(this.modelValue).utc().format('yyyy-MM-DD');
          }
          else if(this.type === 'time'){
            return moment(this.modelValue).utc().format('HH:mm');
          }
          else if(this.type === 'datetime-local'){
            return moment(this.modelValue).utc().format('yyyy-MM-DDTHH:mm');
          }
        }
        else{
          return this.modelValue;
        }


      },
      set(val){

        if(val !== null){

          if(this.type === 'time'){

            const splitted = val.split(':');
            this.$emit('update:modelValue', new Date(Date.UTC(1970, 0, 1, ...splitted)).getTime());
          }
          else if(this.type === 'datetime-local'){

            this.$emit('update:modelValue', +moment(val).utc(true));
          }
          else{

            this.$emit('update:modelValue', new Date(val).getTime());
          }
        }
        else{
          this.$emit('update:modelValue', null);
        }

      }
    }
  }
};
</script>
