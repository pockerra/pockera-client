<template>
  <div class="sign-up-room" @submit.prevent="onSubmit">
    <form>
      <label>
        Name:
        <input type="text" class="pk-input" placeholder="John" required v-model="name" />
      </label>

      <PkButton type="submit" block>enter</PkButton>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PkButton from '@/components/shared/PkButton/PkButton.vue';

export default defineComponent({
  name: 'SignUpRoom',
  components: { PkButton },
  emits: ['submit'],
  setup(props, { emit }) {
    const name = ref('');

    const onSubmit = () => {
      emit('submit', { name: name.value });
    };

    return { onSubmit, name };
  },
});
</script>

<style scoped lang="scss">
.sign-up-room {
  label {
    display: block;
    margin-top: 1.5rem;
  }
}
</style>
