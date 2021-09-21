<template>
  <div class="poker-user-list" v-if="users">
    <PokerUser v-for="user in users" :key="user" :is-top="isTop">
      {{ user.name }}
      <template v-slot:card>
        <UserSelectedCard :hidden="hidden" :number="user.card"></UserSelectedCard>
      </template>
    </PokerUser>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokerUser from '@/components/PlayRoom/PokerUser.vue';
import UserSelectedCard from '@/components/PlayRoom/UserSelectedCard.vue';

export default defineComponent({
  name: 'PokerUserList',
  components: { UserSelectedCard, PokerUser },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    isTop: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.poker-user-list {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
}
</style>
