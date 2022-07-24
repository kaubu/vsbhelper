<template>
  <div v-if="!separator">
    <q-item clickable tag="a" target="_self" :href="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div v-else>
    <q-separator inset />
    <div v-if="title != ''">
      <!-- Render this if there is a title -->
      <p class="q-pt-md q-pl-md text-subtitle2">{{ title }}</p>
      <q-separator inset />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      default: '',
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    separator: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
