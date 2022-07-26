<template>
  <div>
    <div class="q-pa-md" style="min-width: 300px; max-width: 300px">
      <div class="q-gutter-md">
        <q-select
          outlined
          v-model="energy_model"
          :options="energy_options"
          label="Energy Type"
          v-bind="energyBind"
        />
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input outlined v-model="energy" label="Energy" suffix="energyUnit" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let energy = ref(0);
    let energyUnit = ref('J');

    return {
      energy_model: ref('Joules'),
      energy_options: ['Joules', 'Kilojoules', 'Megajoules'],
      energy,
      energyUnit,
    };
  },
};
</script>
