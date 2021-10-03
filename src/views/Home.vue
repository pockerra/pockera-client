<template>
  <div class="home">
    <SignUpRoom @submit="onSubmit" v-if="!joined" />
    <PlayRoom @select-card="selectCard" v-else :hidden="hidden" :users="users" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';
import SignUpRoom from '@/components/signup/SignUpRoom.vue';
import PlayRoom from '@/components/PlayRoom/PlayRoom.vue';
import { Card, Room, User, UserId } from '@/types/user';

export default defineComponent({
  name: 'Home',
  components: { PlayRoom, SignUpRoom },
  setup() {
    const socket = io('http://localhost:3001');

    const users = ref<Array<User>>([]);
    const currentUser = ref('');
    const hidden = ref<boolean>(false);
    const joined = ref<boolean>(false);
    const room = ref<string>('123');

    const onSubmit = async ({ name }: { name: string }) => {
      if (name) {
        await socket.emit('join-room', { name, roomId: room.value });
        currentUser.value = name;
        joined.value = true;
      }
    };

    const selectCard = (card: number) => {
      socket.emit('select-card', {
        card,
        room: room.value,
        userId: socket.id,
      });
    };

    hidden.value = false;

    onMounted(async () => {
      await socket.connect();

      socket.on(
        'selected-card',
        ({ usersInRoom }: { data: { card: Card; room: Room; userId: UserId }; usersInRoom: Array<User> }) => {
          users.value = usersInRoom;
        }
      );

      socket.on('user-joined', ({ usersInRoom }) => {
        users.value = usersInRoom;
      });

      socket.on('user-left', ({ usersInRoom }) => {
        users.value = usersInRoom;
      });
    });

    return { onSubmit, users, hidden, joined, selectCard };
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
