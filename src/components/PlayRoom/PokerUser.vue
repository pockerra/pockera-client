<template>
  <div class="poker-user" :class="{ 'is-top': isTop, selected }">
    <span>
      <slot>{{ name }}</slot>
    </span>
    <div class="card">
      <slot name="card" />
    </div>
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
    selected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
@use '~@/assets/scss/res/colors.scss';
@use '~@/assets/scss/res/rem.scss';

.poker-user {
  background: colors.$alto-gray;
  border-radius: 10px;
  max-width: 10rem;
  padding: 1rem;
  position: relative;
  display: flex;
  justify-content: center;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
    text-transform: capitalize;
  }

  .card {
    position: absolute;
    bottom: 100%;
    margin-bottom: rem.rem-calc(30px);
    color: colors.$base-black !important;
  }

  &.is-top .card {
    bottom: auto;
    top: 100%;
    margin-bottom: 0;
    margin-top: rem.rem-calc(30px);
  }

  &.selected {
    background: colors.$cornflower-blue;
    color: colors.$white;
  }
}
</style>
