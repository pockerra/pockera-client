<script lang="ts">
  import Modal from '../ui/Modal.svelte';
  import DisplayNameForm from './DisplayNameForm.svelte';

  interface Props {
    open: boolean;
    onsubmit: (name: string) => void;
    onclose?: () => void;
  }

  let { open = $bindable(false), onsubmit, onclose }: Props = $props();
</script>

<Modal bind:open title="Enter Your Name" {onclose}>
  <DisplayNameForm {onsubmit} />
</Modal>
