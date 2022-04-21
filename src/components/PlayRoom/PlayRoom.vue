<template>
  <div class="play-room">
    <PokerTable :hidden="hidden" class="table" :users="users" />
    <div class="actions">
      <PlayRoomActions @reveal="onReveal" @start-over="$emit('start-over')" :revealed="!hidden" v-show="!start" />
      <PlayRoomCounter :start="start" @stopped="onStopped" />
    </div>
    <PokerCardList v-show="hidden && !start" class="list" @selected="onSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    start: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onSelected = (card: number) => {
      emit('select-card', card);
    };

    const onReveal = () => {
      emit('start-countdown');
    };

    const onStopped = () => {
      emit('reveal');
    };

    console.log(props);

    return { onSelected, onReveal, onStopped };
  },
  emits: ['select-card', 'start-over', 'reveal', 'start-countdown'],
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

  .actions {
    display: flex;
    justify-content: center;
  }
}
</style>
