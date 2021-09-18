<template>
  <div class="sign-up-room" @submit.prevent="onSubmit">
    <form>
      <label>
        Name:
        <input type="text" class="pk-input" placeholder="John" v-model="name" />
      </label>

      <label>
        Room id :
        <input type="text" class="pk-input" placeholder="roomId" v-model="roomId" />
      </label>

      <button type="submit">enter</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SignUpRoom',
  emits: ['submit'],
  setup(props, { emit }) {
    const name = ref('');
    const roomId = ref('');

    const onSubmit = () => {
      emit('submit', { name: name.value, roomId: roomId.value });
    };

    return { onSubmit, name, roomId };
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
