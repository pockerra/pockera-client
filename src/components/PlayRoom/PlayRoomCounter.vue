<template>
  <div class="play-room-counter">{{ number }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
  name: 'PlayRoomCounter',
  props: {
    start: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const number = ref(3);

    const countDown = () => {
      const timeout = setTimeout(() => {
        number.value -= 1;
        if (number.value > 0) {
          countDown();
        } else {
          clearTimeout(timeout);
          emit('stopped');
          number.value = 3;
        }
      }, 1000);
    };

    watchEffect(() => {
      if (props.start) countDown();
    });

    return { number };
  },
  emits: ['stopped'],
});
</script>

<style scoped lang="scss"></style>
