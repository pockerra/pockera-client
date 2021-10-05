<template>
  <div class="play-room">
    <PokerTable :hidden="hidden" class="table" :users="users" />
    <PlayRoomActions @reveal="$emit('reveal')" @start-over="$emit('start-over')" :revealed="!hidden" />
    <PokerCardList class="list" @selected="onSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokerCardList from '@/components/PlayRoom/PokerCardList.vue';
import PokerTable from '@/components/PlayRoom/PokerTable.vue';
import PlayRoomActions from '@/components/PlayRoom/PlayRoomActions.vue';

export default defineComponent({
  name: 'PlayRoom',
  components: { PlayRoomActions, PokerTable, PokerCardList },
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
  emits: ['select-card', 'start-over', 'reveal'],
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
