<template>
  <div class="home">
    <SignUpRoom @submit="onSubmit" />
    <PlayRoom :users="users" />
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

    const users = ref<Array<string>>([]);

    const onSubmit = ({ name, roomId }: { name: string; roomId: string }) => {
      if (name && roomId) {
        socket.emit('join-room', { name, roomId });
      }
    };

    users.value = ['milad', 'ali'];

    return { onSubmit, users };
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
