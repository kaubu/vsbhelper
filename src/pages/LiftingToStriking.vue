<template>
  <div class="q-gutter-md row-12 no-wrap" style="height: 100%">
    <div id="calculations" class="q-pa-md col-6">
      <form @submit.prevent="displayAttackPotency">
        <div class="q-pa-md row justify-center items-center">
          <div class="q-gutter-md" style="min-width: 300px; max-width: 300px">
            <q-input outlined clearable v-model="mass" label="Mass (kg)" />
          </div>
        </div>

        <div class="q-pa-md row justify-center items-center">
          <div class="q-gutter-md" style="min-width: 300px; max-width: 300px">
            <q-input outlined v-model="gravity" label="Gravity (m/s^2)" />
          </div>
        </div>

        <div class="q-pa-md row justify-center items-center">
          <div class="q-gutter-md" style="min-width: 300px; max-width: 300px">
            <q-input outlined v-model="height" label="Height (m)" />
          </div>
        </div>

        <div class="q-pa-md q-gutter-sm row justify-center items-center">
          <q-btn
            type="submit"
            color="primary"
            label="Calculate"
            align="center"
          />
        </div>
      </form>
    </div>

    <div id="results" class="text-center col-6">
      <p><b>Attack Potency:</b> {{ attackPotency }} level</p>
      <!-- <br /><q-separator inset /><br /> -->
      <p><b>Joules:</b> {{ joulesDisplay }} J</p>
      <p><b>Kilojoules:</b> {{ kilojoulesDisplay }} kJ</p>
      <p><b>Megajoules:</b> {{ megajoulesDisplay }} MJ</p>
      <!-- <br /><q-separator inset /><br /> -->
      <p><b>Tons of TNT:</b> {{ tonsDisplay }} T</p>
      <p><b>Kilotons of TNT:</b> {{ kilotonsDisplay }} KT</p>
      <p><b>Megatons of TNT:</b> {{ megatonsDisplay }} MT</p>
      <p><b>Gigatons of TNT:</b> {{ gigatonsDisplay }} GT</p>
      <p><b>Teratons of TNT:</b> {{ teratonsDisplay }} TT</p>
      <p><b>Petatons of TNT:</b> {{ petatonsDisplay }} PT</p>
      <p>Formula: AP = (m * g * h) / 5</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { metricUpgrade, megajoulesToTNT } from '../components/conversion';
import { getEnergyFromJoules } from '../components/models';

function getAttackPotencyFromJoules(joules: number) {
  if (joules == NaN) {
    return 'No level';
  }

  if (joules >= 0 && joules <= 40) {
    return 'Below Average Human';
  } else if (joules > 40 && joules <= 100) {
    return 'Human';
  } else if (joules > 100 && joules <= 300) {
    return 'Athelete';
  }

  let kilojoules = metricUpgrade(joules);

  if (kilojoules > 0.3 && kilojoules <= 15) {
    return 'Street';
  } else if (kilojoules > 15 && kilojoules <= 20920) {
    return 'Wall';
  }

  let megajoules = metricUpgrade(kilojoules);
  let tons = megajoulesToTNT(megajoules);

  if (tons > 0.005 && tons <= 0.25) {
    return 'Small Building';
  } else if (tons > 0.25 && tons <= 2) {
    return 'Building';
  } else if (tons > 2 && tons <= 11) {
    return 'Large Building';
  } else if (tons > 11 && tons <= 100) {
    return 'City Block';
  } else if (tons > 100 && tons <= 1000) {
    return 'Multi-City Block';
  }

  let kilotons = metricUpgrade(tons);

  if (kilotons > 1 && kilotons <= 5.8) {
    return 'Small Town';
  } else if (kilotons > 5.8 && kilotons <= 100) {
    return 'Town';
  } else if (kilotons > 100 && kilotons <= 1000) {
    return 'Large Town';
  }

  let megatons = metricUpgrade(kilotons);

  if (megatons > 1 && megatons <= 6.3) {
    return 'Small City';
  } else if (megatons > 6.3 && megatons <= 100) {
    return 'City';
  } else if (megatons > 100 && megatons <= 1000) {
    return 'Mountain';
  }

  let gigatons = metricUpgrade(megatons);

  if (gigatons > 1 && gigatons <= 4.3) {
    return 'Large Mountain';
  } else if (gigatons > 4.3) {
    return 'Higher than Large Mountain';
  } else {
    return 'Unknown';
  }
}

export default defineComponent({
  setup() {
    let mass = ref();
    let gravity = ref(9.80665);
    let height = ref(1.6845);

    let attackPotency = ref('Unknown');

    let joulesDisplay = ref('');
    let kilojoulesDisplay = ref('');
    let megajoulesDisplay = ref('');

    let tonsDisplay = ref('');
    let kilotonsDisplay = ref('');
    let megatonsDisplay = ref('');
    let gigatonsDisplay = ref('');
    let teratonsDisplay = ref('');
    let petatonsDisplay = ref('');

    function calculateJoules() {
      let joules = (mass.value * gravity.value * height.value) / 5;
      // console.log(`Joules: ${joules}`);
      return joules;
    }

    function displayAttackPotency() {
      const joules = calculateJoules();

      const energyValues = getEnergyFromJoules(joules);

      joulesDisplay.value = joules.toFixed(2);
      kilojoulesDisplay.value = energyValues.kilojoules.toFixed(2);
      megajoulesDisplay.value = energyValues.megajoules.toFixed(2);

      tonsDisplay.value = energyValues.tons.toFixed(2);
      kilotonsDisplay.value = energyValues.kilotons.toFixed(2);
      megatonsDisplay.value = energyValues.megatons.toFixed(2);
      gigatonsDisplay.value = energyValues.gigatons.toFixed(2);
      teratonsDisplay.value = energyValues.teratons.toFixed(2);
      petatonsDisplay.value = energyValues.petatons.toFixed(2);

      attackPotency.value = getAttackPotencyFromJoules(joules);
    }

    return {
      mass,
      gravity,
      height,
      attackPotency,
      displayAttackPotency,
      joulesDisplay,
      kilojoulesDisplay,
      megajoulesDisplay,
      tonsDisplay,
      kilotonsDisplay,
      megatonsDisplay,
      gigatonsDisplay,
      teratonsDisplay,
      petatonsDisplay,
    };
  },
});
</script>
