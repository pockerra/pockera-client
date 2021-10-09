<template>
  <div class="user-selected-card" :class="{ hidden }">
    {{ shownNumber }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserSelectedCard',
  props: {
    hidden: {
      type: Boolean,
      default: true,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    shownNumber() {
      return this.number ? this.number : '?';
    },
  },
});
</script>

<style scoped lang="scss">
@use '~@/assets/scss/res/rem.scss';
@use '~@/assets/scss/res/colors.scss';

.user-selected-card {
  width: rem.rem-calc(40px);
  height: rem.rem-calc(80px);
  border-radius: 8px;
  background: colors.$white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: rem.rem-calc(24px);

  &.hidden {
    background: #000;
    color: transparent;
  }
}
</style>
