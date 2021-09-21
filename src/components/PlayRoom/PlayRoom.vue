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
  setup() {
    const onSelected = (card: number) => {
      alert(card);
    };
    return { onSelected };
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
