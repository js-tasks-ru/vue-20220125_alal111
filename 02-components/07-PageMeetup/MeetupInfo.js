import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      required: true,
    },
    place: {
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formatedDate(){
      return new Date(this.$props.date).toLocaleDateString(navigator.language, {day: 'numeric', month: 'long', year: 'numeric'})
    }
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="new Date(date).toISOString().replace(/T.*/, '')">{{ formatedDate }}</time>
      </li>
    </ul>`,
});
