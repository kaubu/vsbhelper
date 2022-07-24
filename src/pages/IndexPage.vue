<template>
  <div id="calculations" class="q-pa-md">
    <form @submit.prevent="displayAttackPotency">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input clearable v-model="mass" label="Mass (kg)" />
        </div>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input v-model="gravity" label="Gravity (m/s^2)" />
        </div>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input v-model="height" label="Height (m)" />
        </div>
      </div>

      <div class="q-pa-md q-gutter-sm">
        <q-btn type="submit" color="primary" label="Calculate" />
      </div>

      <p>Joules: {{ joulesDisplay }}</p>
      <p>Attack Potency: {{ attackPotency }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Ref, ref, defineComponent } from 'vue';

function convertJoulesToKilojoules(joules: number) {
  return joules / 1000;
}

function convertKilojoulesToMegajoules(kilojoules: number) {
  return kilojoules / 1000;
}

function convertMegajoulesToTonsOfTNT(megajoules: number) {
  return megajoules / 4184;
}

function convertTonsHigher(tons: number) {
  // Ton -> Kilo -> Mega, etc
  return tons / 1000;
}

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

  let kilojoules = convertJoulesToKilojoules(joules);

  if (kilojoules > 0.3 && kilojoules <= 15) {
    return 'Street';
  } else if (kilojoules > 15 && kilojoules <= 20920) {
    return 'Wall';
  }

  let megajoules = convertKilojoulesToMegajoules(kilojoules);
  let tons = convertMegajoulesToTonsOfTNT(megajoules);

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

  let kilotons = convertTonsHigher(tons);

  if (kilotons > 1 && kilotons <= 5.8) {
    return 'Small Town';
  } else if (kilotons > 5.8 && kilotons <= 100) {
    return 'Town';
  } else if (kilotons > 100 && kilotons <= 1000) {
    return 'Large Town';
  }

  let megatons = convertTonsHigher(kilotons);

  if (megatons > 1 && megatons <= 6.3) {
    return 'Small City';
  } else if (megatons > 6.3 && megatons <= 100) {
    return 'City';
  } else if (megatons > 100 && megatons <= 1000) {
    return 'Mountain';
  }

  let gigatons = convertTonsHigher(megatons);

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
    let joulesDisplay = ref(0);

    function calculateJoules() {
      let joules = (mass.value * gravity.value * height.value) / 5;
      console.log(`Joules: ${joules}`);
      return joules;
    }

    function displayAttackPotency() {
      let joules = calculateJoules();
      joulesDisplay.value = joules;
      attackPotency.value = getAttackPotencyFromJoules(joules);
    }

    return {
      mass,
      gravity,
      height,
      attackPotency,
      displayAttackPotency,
      joulesDisplay,
    };
  },
});
</script>
