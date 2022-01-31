import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      loading: true,
      error: false,
      meetup: null
    }
  },
  created(){
    this.loadMeetup(this.meetupId)
  },
  watch: {
    meetupId(newVal){
      this.loadMeetup(newVal)
    }
  },
  methods: {
    async loadMeetup(id){
      this.loading = true;
      this.error = false;
      this.meetup = null;
      await fetchMeetupById(id)
          .then(data => {
            this.loading = false;
            this.meetup = data;
          })
          .catch(err => {
            this.error = err;
            this.loading = false;

          })
    }
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
        <MeetupView v-if="meetup && !loading" :meetup="meetup"/>
       <!--<MeetupView />-->
      <ui-container v-if="loading && !error">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{ error.message }}</ui-alert>
      </ui-container>
    </div>`,
});
