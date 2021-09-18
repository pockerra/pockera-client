<template>
  <div class="poker-card-list">
    <PokerCard v-for="card in fibonacci" :key="card" :number="card" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import fibonacci from '@/libs/fibonacci';
import PokerCard from '@/components/PlayRoom/PokerCard.vue';

export default defineComponent({
  name: 'PokerCardList',
  components: { PokerCard },
  setup() {
    return { fibonacci };
  },
});
</script>

<style scoped lang="scss">
.poker-card-list {
  display: flex;
  justify-content: space-between;
}
</style>
