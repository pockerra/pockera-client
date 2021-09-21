<template>
  <div class="home">
    <SignUpRoom @submit="onSubmit" v-if="!joined" />
    <PlayRoom :hidden="hidden" :users="users" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';
import SignUpRoom from '@/components/signup/SignUpRoom.vue';
import PlayRoom from '@/components/PlayRoom/PlayRoom.vue';

export default defineComponent({
  name: 'Home',
  components: { PlayRoom, SignUpRoom },
  setup() {
    const socket = io('http://localhost:3001');

    onMounted(() => {
      socket.connect();
    });

    const users = ref<Array<{ name: string; card?: number }>>([]);
    const hidden = ref<boolean>(false);
    const joined = ref<boolean>(true);

    const onSubmit = ({ name, roomId }: { name: string; roomId: string }) => {
      if (name && roomId) {
        socket.emit('join-room', { name, roomId });
      }
    };

    users.value = [
      { name: 'milad', card: 5 },
      { name: 'ali', card: 7 },
    ];

    hidden.value = false;

    return { onSubmit, users, hidden, joined };
  },
});
</script>

<style lang="scss" src="../assets/scss/global.scss" />
<style lang="scss" scoped>
.home {
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
  padding: 2rem 0 6rem 0;
}
</style>
