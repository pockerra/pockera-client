<template>
  <div class="poker-table">
    <PokerUserList :hidden="hidden" :users="topUsers" is-top />
    <div class="table"></div>
    <PokerUserList :hidden="hidden" :users="bottomUsers" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import PokerUserList from '@/components/PlayRoom/PokerUserList.vue';

export default defineComponent({
  name: 'PokerTable',
  components: { PokerUserList },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const usersLength = computed(() => props.users?.length);
    const halfSize = computed(() => Math.ceil(usersLength.value / 2));

    const topUsers = computed(() => {
      if (!usersLength.value) return [];
      const users = [...props.users];
      return users?.slice(0, halfSize.value);
    });

    const bottomUsers = computed(() => {
      if (!usersLength.value) return [];
      const users = [...props.users];
      return users?.slice(halfSize.value);
    });

    return {
      topUsers,
      bottomUsers,
      halfSize,
    };
  },
});
</script>

<style scoped lang="scss">
@use '~@/assets/scss/res/colors.scss';

.poker-table {
  .table {
    width: 100%;
    height: 200px;
    border-radius: 100px;
    background-color: colors.$chateau-green;
  }
}
</style>
