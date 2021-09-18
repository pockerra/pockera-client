<template>
  <div class="poker-card">{{ number }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PokerCard',
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped lang="scss">
@use '~@/assets/scss/res/rem.scss';
@use '~@/assets/scss/res/colors.scss';

.poker-card {
  width: rem.rem-calc(50px);
  height: rem.rem-calc(100px);
  background: colors.$primary-gradient;
  display: flex;
  align-items: center;
  justify-content: center;
  color: colors.$white;
  cursor: pointer;
  border-radius: 4px;
}
</style>
