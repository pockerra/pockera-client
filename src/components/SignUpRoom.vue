<template>
  <div class="sign-up-room">
    <form>
      <label>
        Name:
        <input type="text" placeholder="John" />
      </label>

      <label>
        Room id :
        <input type="text" placeholder="roomId" />
      </label>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignUpRoom',
  // setup() {},
});
</script>

<style scoped lang="scss">
.sign-up-room {
  label {
    display: block;
  }
}
</style>
