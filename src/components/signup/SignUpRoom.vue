<template>
  <div class="sign-up-room" @submit.prevent="onSubmit">
    <form>
      <label>
        Name:
        <input ref="input" type="text" class="pk-input" placeholder="John" required v-model="name" />
      </label>

      <PkButton type="submit" block>enter</PkButton>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import PkButton from '@/components/shared/PkButton/PkButton.vue';

export default defineComponent({
  name: 'SignUpRoom',
  components: { PkButton },
  emits: ['submit'],
  setup(props, { emit }) {
    const name = ref('');
    const input = ref<HTMLInputElement>();

    onMounted(() => {
      nextTick(() => {
        const inputEl: HTMLInputElement | undefined= input.value;
        inputEl?.focus();
      });
    });

    const onSubmit = () => {
      emit('submit', { name: name.value });
    };

    return { onSubmit, name, input };
  },
});
</script>

<style scoped lang="scss">
.sign-up-room {
  label {
    display: block;
    margin: 1.5rem 0;
  }
}
</style>
