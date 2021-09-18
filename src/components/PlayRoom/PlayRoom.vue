<template>
  <div class="play-room">
    <PokerTable class="table" :users="users" />
    <PokerCardList class="list" />
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
      default: () => ['Milad', 'Amir', 'gholam', 'Pony', 'honda', 'zonda', 'Zony', 'Lombada', 'Sombada'],
    },
  },
  setup() {
    return {};
  },
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
