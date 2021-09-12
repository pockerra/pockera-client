<template>
  <div class="home">
    <SignUpRoom />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { io } from 'socket.io-client';
import SignUpRoom from '@/components/SignUpRoom.vue';

export default defineComponent({
  name: 'Home',
  components: { SignUpRoom },
  setup() {
    const socket = io('http://localhost:3001');

    onMounted(() => {
      socket.connect();
    });
  },
});
</script>

<style lang="scss" src="../assets/scss/global.scss" />
