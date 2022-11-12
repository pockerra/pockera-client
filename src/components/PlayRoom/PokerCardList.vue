<template>
  <div class="poker-card-list">
    <PokerCard
      v-for="card in fibonacci"
      :active="selectedCard === card"
      :turn-off="!!selectedCard && selectedCard !== card"
      @click="onClick(card)"
      :key="card"
      :number="card"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import fibonacci from '@/libs/fibonacci';
import PokerCard from '@/components/PlayRoom/PokerCard.vue';
import { useStore } from '@/store/pinia';

export default defineComponent({
  name: 'PokerCardList',
  components: { PokerCard },
  setup(props, { emit }) {
    const onClick = (number: number) => {
      emit('selected', number);
    };

    const store = useStore();

    const selectedCard = computed<number>(() => store.user.card);

    return { fibonacci, onClick, selectedCard };
  },
});
</script>

<style scoped lang="scss">
.poker-card-list {
  display: flex;
  justify-content: space-between;
}
</style>
