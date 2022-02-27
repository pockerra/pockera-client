<template>
  <div class="home">
    <SignUpRoom @submit="onSubmit" v-if="!joined" />
    <PlayRoom
      v-else-if="!loading"
      @select-card="selectCard"
      @start-countdown="startCountdown"
      @reveal="reveal"
      @start-over="startOver"
      :start="start"
      :hidden="hidden"
      :users="users"
    />
    <div class="loading" v-else>
      <PkLoader color="#999" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';
import PlayRoom from '@/components/PlayRoom/PlayRoom.vue';
import { Card, RoomName, User, UserId } from '@/types';
import SignUpRoom from '@/components/signup/SignUpRoom.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import PkLoader from '@/components/shared/PkLoader/PkLoader.vue';

export default defineComponent({
  name: 'Home',
  components: { PkLoader, SignUpRoom, PlayRoom },
  setup() {
    const apiUrl = process.env.VUE_APP_API_ADDRESS;
    const socket = io(apiUrl || 'https://pockerra-backend.herokuapp.com/');

    const users = ref<Array<User>>([]);
    const currentUser = ref('');
    const joined = ref<boolean>(false);
    const start = ref<boolean>(false);
    const loading = ref<boolean>(true);
    const store = useStore();
    const route = useRoute();

    const room = route.params.roomId;

    if (store.state.user.name) {
      joined.value = true;
      store.commit('setUserRoom', { room });
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
      if (store.state.user.card !== card) {
        store.commit('setUserCard', { card });

        socket.emit('select-card', {
          card: card,
          room: room,
          userId: socket.id,
        });
      } else {
        store.commit('setUserCard', { card: 0 });

        socket.emit('select-card', {
          card: 0,
          room: room,
          userId: socket.id,
        });
      }
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
      store.commit('setUserCard', 0);
    };

    onMounted(async () => {
      await socket.connect();

      socket.onAny(() => {
        loading.value = false;
      });

      socket.on(
        'selected-card',
        ({ usersInRoom }: { data: { card: Card; room: RoomName; userId: UserId }; usersInRoom: Array<User> }) => {
          users.value = usersInRoom;
        }
      );

      socket.on('user-joined', ({ usersInRoom, room }) => {
        users.value = usersInRoom;
        store.commit('setRoom', room);
      });

      socket.on('user-left', ({ usersInRoom }) => {
        users.value = usersInRoom;
      });

      socket.on('revealed', () => {
        store.commit('showCards');
      });

      socket.on('start-countdown', () => {
        start.value = true;
      });

      socket.on('started', ({ usersInRoom }: { usersInRoom: Array<User> }) => {
        users.value = usersInRoom;
        store.commit('hideCards');
      });
    });

    return {
      onSubmit,
      users,
      loading,
      joined,
      selectCard,
      reveal,
      startOver,
      startCountdown: startCountdown,
      start,
      hidden: computed(() => store.state.room.hidden),
    };
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

  .loading {
    display: flex;
    margin-top: 8rem;
    justify-content: center;
  }
}
</style>
