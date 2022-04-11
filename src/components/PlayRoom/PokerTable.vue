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
    border: 5px solid #a95555;
    &::after {
      content: '';
      border: 7px solid rgba(0, 0, 0, 0.1);
      display: block;
      width: 100%;
      height: 190px;
      border-radius: 130px;
      left: 0;
    }
  }
}
</style>
