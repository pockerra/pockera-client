<script lang="ts">
  import Input from '../ui/Input.svelte';
  import Button from '../ui/Button.svelte';
  import { User } from 'lucide-svelte';

  interface Props {
    onsubmit: (name: string) => void;
    initialName?: string;
  }

  let { onsubmit, initialName = '' }: Props = $props();
  let name = $state('');
  $effect(() => { name = initialName; });

  function handleSubmit() {
    if (name.trim()) {
      onsubmit(name.trim());
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit();
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="name-form" onkeydown={handleKeydown}>
  <div class="form-icon">
    <User size={32} />
  </div>
  <h3 class="form-title">What's your name?</h3>
  <p class="form-desc">Enter a display name to join the game</p>
  <Input
    bind:value={name}
    placeholder="Your name"
  />
  <Button onclick={handleSubmit} disabled={!name.trim()}>
    Join Game
  </Button>
</div>

<style>
  .name-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 2rem;
    max-width: 360px;
    width: 100%;
  }

  .form-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: var(--color-primary-light);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .form-desc {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    text-align: center;
  }

  .name-form :global(.input-group) {
    width: 100%;
  }

  .name-form :global(.btn) {
    width: 100%;
  }
</style>
