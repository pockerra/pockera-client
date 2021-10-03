<template>
  <button class="pk-button" :class="className" @click="onClick"><slot /></button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import remCalc from '@/libs/remCalc';

export default defineComponent({
  name: 'PkButton',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'primary',
    },
    height: {
      type: Number,
      default: 42,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const style = computed(() => ({
      height: remCalc(props.height),
      fontSize: remCalc(props.fontSize),
    }));

    const className = computed(
      () => `pk-btn${props.mode ? ` pk-btn-${props.mode}` : ''}${props.block ? ' pk-btn-block' : ''}`
    );

    const onClick = (e: MouseEvent) => {
      emit('click', e);
    };

    return { style, onClick, className };
  },
  emits: ['click'],
});
</script>

<style scoped lang="scss" src="./PkButton.scss"></style>
