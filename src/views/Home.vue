<template>
  <div class="room">
    <SignUpRoom @submit="onSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpRoom from '@/components/signup/SignUpRoom.vue';
import randomString from '@/libs/randomString';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Room',
  components: { SignUpRoom },
  setup() {
    const router = useRouter();
    const store = useStore();

    const onSubmit = ({ name }: { name: string }) => {
      const roomName = randomString();
      store.commit('setUserName', { name });
      store.commit('setUserRoom', { room: roomName });
      store.commit('setRoom', { name: roomName, hidden: true });

      router.push(`/room/${roomName}`);
    };

    return { onSubmit };
  },
});
</script>

<style lang="scss" src="../assets/scss/global.scss" />
<style scoped lang="scss">
.room {
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
  padding: 2rem 0 6rem 0;
}
</style>
