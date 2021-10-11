<template>
  <div class="room">
    <SignUpRoom @submit="onSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpRoom from '@/components/signup/SignUpRoom.vue';
import randomString from '@/libs/randomString';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Room',
  components: { SignUpRoom },
  setup() {
    const onSubmit = ({ name }) => {
      const router = useRouter();
      const route = useRoute();
      const store = useStore();

      const roomName = randomString();
      store.commit('setUserName', { name });
      if (route.path === '/') {
        router.push(`/room/${roomName}`);
      }
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
