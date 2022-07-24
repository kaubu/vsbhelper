<template>
  <form @submit.prevent="calculateJoules">
    <div id="calculations" @submit.prevent="simulateSubmit" class="q-pa-md">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input clearable v-model="mass" label="Mass (kg)" type="standard" />
        </div>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input v-model="gravity" label="Gravity (m/s^2)" type="standard" />
        </div>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input v-model="height" label="Height (m)" type="standard" />
        </div>
      </div>

      <div class="q-pa-md q-gutter-sm">
        <q-btn type="submit" color="primary" label="Calculate" />
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // var convert = require('convert-units')

    let mass = ref();
    let gravity = ref(9.80665);
    let height = ref(1.6845);

    function calculateJoules() {
      let joules = (mass.value * gravity.value * height.value) / 5;
      console.log(`Joules: ${joules}`);
      return joules;
    }

    return {
      mass,
      gravity,
      height,
      calculateJoules,
    };
  },
};
</script>
