<template>
  <div class="poker-user" :class="{ isTop }">
    <slot>{{ name }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PokerUser',
  props: {
    name: {
      type: String,
      default: '',
    },
    isTop: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
@use '~@/assets/scss/res/colors.scss';
.poker-user {
  background: colors.$alto-gray;
  border-radius: 10px;
  width: 6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem;
}
</style>
