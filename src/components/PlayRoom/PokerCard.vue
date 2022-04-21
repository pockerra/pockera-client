<template>
  <div class="poker-card" @click="onClick" :class="{ active, 'turn-off': turnOff }">
    <div class="left">{{ number }}</div>
    <div class="center">{{ number }}</div>
    <div class="right">{{ number }}</div>
  </div>
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
    turnOff: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      emit('click', e);
    };

    return {
      onClick,
    };
  },
  emits: ['click'],
});
</script>

<style scoped lang="scss">
@use '~@/assets/scss/res/rem.scss';
@use '~@/assets/scss/res/colors.scss';

.poker-card {
  width: rem.rem-calc(65px);
  height: rem.rem-calc(120px);
  background: #4b00ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: colors.$white;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #ffffff;
  padding: 0.2rem 0.4rem;

  .left {
    text-align: left;
    width: 100%;
    color: #fff;
    padding-bottom: 5px;
  }

  .center {
    text-align: center;
    width: 100%;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 1rem 0;
  }

  .right {
    text-align: right;
    width: 100%;
    color: #fff;
    padding-bottom: 5px;
  }

  &.active {
    transform: translateY(-0.5rem);
    -webkit-animation: rotateCard 0.5s linear;
    -moz-animation: rotateCard 0.5s linear;
    -o-animation: rotateCard 0.5s linear;
    animation: rotateCard 0.5s linear;
  }

  &.turn-off {
    background: darken(colors.$alto-gray, 20);
  }

  &:hover {
    background: lighten(colors.$primary, 10);
  }

  @-webkit-keyframes rotateCard {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
  @-moz-keyframes rotateCard {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
  @-o-keyframes rotateCard {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
  @keyframes rotateCard {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
}
</style>
