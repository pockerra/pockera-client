<script lang="ts">
  import { Link, Check, Copy } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';

  interface Props {
    roomId: string;
  }

  let { roomId }: Props = $props();
  let copied = $state(false);

  const inviteUrl = $derived(`${window.location.origin}/#/join/${roomId}`);

  async function copyLink() {
    await navigator.clipboard.writeText(inviteUrl);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="invite-link">
  <div class="link-display">
    <Link size={14} />
    <span class="link-text">{inviteUrl}</span>
  </div>
  <Button size="sm" variant="secondary" onclick={copyLink}>
    {#if copied}
      <Check size={14} /> Copied!
    {:else}
      <Copy size={14} /> Copy
    {/if}
  </Button>
</div>

<style>
  .invite-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  .link-display {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex: 1;
    min-width: 0;
    color: var(--color-text-secondary);
  }

  .link-text {
    font-size: 0.8125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: monospace;
  }
</style>
