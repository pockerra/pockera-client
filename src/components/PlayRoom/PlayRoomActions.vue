<template>
  <div class="play-room-actions">
    <PkButton @click="onReveal" v-if="!revealed">Reveal</PkButton>
    <PkButton @click="onStartOver" mode="muted" v-else>Start Over</PkButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PkButton from '@/components/shared/PkButton/PkButton.vue';

export default defineComponent({
  name: 'PlayRoomActions',
  props: {
    revealed: {
      type: Boolean,
      default: false,
    },
  },
  components: { PkButton },
  setup(props, { emit }) {
    const onReveal = () => {
      emit('reveal');
    };
    const onStartOver = () => {
      emit('start-over');
    };

    return { onReveal, onStartOver };
  },
  emits: ['reveal', 'start-over'],
});
</script>

<style scoped lang="scss"></style>
