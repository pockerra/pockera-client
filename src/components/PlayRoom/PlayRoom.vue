<template>
  <div class="play-room">
    <PokerTable :hidden="hidden" class="table" :users="users" />
    <PokerCardList class="list" @selected="onSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokerCardList from '@/components/PlayRoom/PokerCardList.vue';
import PokerTable from '@/components/PlayRoom/PokerTable.vue';

export default defineComponent({
  name: 'PlayRoom',
  components: { PokerTable, PokerCardList },
  props: {
    room: {
      type: String,
      default: '',
    },
    users: {
      type: Array,
      default: () => [],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onSelected = (card: number) => {
      emit('select-card', card);
    };
    return { onSelected };
  },
  emits: ['select-card'],
});
</script>

<style scoped lang="scss">
.play-room {
  .list {
    margin-top: 2rem;
  }

  .table {
    margin-top: 3rem;
  }
}
</style>
