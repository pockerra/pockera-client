<template>
  <div class="home">
    <SignUpRoom @submit="onSubmit" v-if="!joined" />
    <PlayRoom
      v-else
      @select-card="selectCard"
      @start-countdown="startCountdown"
      @reveal="reveal"
      @start-over="startOver"
      :start="start"
      :hidden="hidden"
      :users="users"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';
import PlayRoom from '@/components/PlayRoom/PlayRoom.vue';
import { Card, RoomName, User, UserId } from '@/types';
import SignUpRoom from '@/components/signup/SignUpRoom.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: { SignUpRoom, PlayRoom },
  setup() {
    const socket = io('http://localhost:3001');

    const users = ref<Array<User>>([]);
    const currentUser = ref('');
    const hidden = ref<boolean>(false);
    const joined = ref<boolean>(false);
    const start = ref<boolean>(false);

    const store = useStore();
    const route = useRoute();

    const room = route.params.roomId;

    if (store.state.user.name) {
      joined.value = true;
      store.commit('setRoom', { room });
      socket.emit('join-room', { name: store.state.user.name, roomId: room });
    }

    const onSubmit = async ({ name }: { name: string }) => {
      if (name) {
        store.commit('setUserName', { name });
        await socket.emit('join-room', { name, roomId: room });
        currentUser.value = name;
        joined.value = true;
      }
    };

    const selectCard = (card: number) => {
      store.commit('setCard', { card });
      socket.emit('select-card', {
        card,
        room: room,
        userId: socket.id,
      });
    };

    const startCountdown = () => {
      start.value = true;
      socket.emit('start-countdown', {
        roomName: room,
      });
    };

    const reveal = () => {
      start.value = false;
      socket.emit('reveal', { roomName: room });
    };

    const startOver = () => {
      socket.emit('start', { roomName: room });
    };

    hidden.value = true;

    onMounted(async () => {
      await socket.connect();

      socket.on(
        'selected-card',
        ({ usersInRoom }: { data: { card: Card; room: RoomName; userId: UserId }; usersInRoom: Array<User> }) => {
          users.value = usersInRoom;
        }
      );

      socket.on('user-joined', ({ usersInRoom }) => {
        users.value = usersInRoom;
      });

      socket.on('user-left', ({ usersInRoom }) => {
        users.value = usersInRoom;
      });

      socket.on('revealed', () => {
        hidden.value = false;
      });

      socket.on('start-countdown', () => {
        start.value = true;
      });

      socket.on('start ed', ({ usersInRoom }: { usersInRoom: Array<User> }) => {
        users.value = usersInRoom;
        console.log(usersInRoom);
        hidden.value = true;
      });
    });

    return { onSubmit, users, hidden, joined, selectCard, reveal, startOver, startCountdown: startCountdown, start };
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
