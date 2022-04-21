<template>
  <div class="poker-user-list" v-if="users">
    <PokerUser v-for="user in users" :key="user" :is-top="isTop" :selected="selected(user.card)">
      {{ user.name }}
      <template v-slot:card>
        <UserSelectedCard :hidden="hidden" :number="cardNumber(user.card)"></UserSelectedCard>
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
  setup() {
    const cardNumber = (cardArray: string[]) => (cardArray[0] ? parseInt(cardArray[0], 10) : 0);

    const selected = (cardArray: string[]) => cardNumber(cardArray) > 0;

    return {
      cardNumber,
      selected,
    };
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
