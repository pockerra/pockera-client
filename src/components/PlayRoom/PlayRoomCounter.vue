<template>
  <div class="play-room-counter" v-show="start">{{ number }}</div>
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
      const downloadTimer = setInterval(() => {
        if (number.value <= 0) {
          clearInterval(downloadTimer);
          emit('stopped');
        }
        number.value -= 1;
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

<style scoped lang="scss">
@use '@/assets/scss/res/rem.scss';

.play-room-counter {
  font-weight: bold;
  font-size: rem.rem-calc(24);
}
</style>
