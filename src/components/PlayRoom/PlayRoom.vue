<template>
  <div class="play-room">
    <PokerTable :hidden="hidden" class="table" :users="users" />
    <PlayRoomActions @reveal="onReveal" @start-over="$emit('start-over')" :revealed="!hidden" v-show="!start" />
    <PokerCardList class="list" @selected="onSelected" />
    <PlayRoomCounter :start="start" @stopped="onStopped" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PokerCardList from '@/components/PlayRoom/PokerCardList.vue';
import PokerTable from '@/components/PlayRoom/PokerTable.vue';
import PlayRoomActions from '@/components/PlayRoom/PlayRoomActions.vue';
import PlayRoomCounter from '@/components/PlayRoom/PlayRoomCounter.vue';

export default defineComponent({
  name: 'PlayRoom',
  components: { PlayRoomCounter, PlayRoomActions, PokerTable, PokerCardList },
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
    const start = ref(false);
    const onSelected = (card: number) => {
      emit('select-card', card);
    };

    const onReveal = () => {
      start.value = true;
    };

    const onStopped = () => {
      start.value = false;
      emit('reveal');
    };

    return { onSelected, onReveal, start, onStopped };
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
