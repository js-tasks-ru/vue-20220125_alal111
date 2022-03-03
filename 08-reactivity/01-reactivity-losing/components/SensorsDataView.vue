<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else >
    <div :key="k">
      <sensors-data-row v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
    </div>

  </template>
</template>

<script>
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: null,
      k: 0
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();

    }, 1000);
  },

  watch: {
    sensors: {
      deep: true,
      handler(){
        this.k++;
      }
    }
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },
  computed: {
    sensorsUpd(){
      return this.sensors;
    }
  },

  methods: {
    callback(data) {
      this.setData(data);
    },

    setData(sensors) {
      const newSensors = {...sensors};
      this.sensors = {...newSensors};
    },
  },
};
</script>

<style scoped></style>
