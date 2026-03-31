<script lang="ts">
  import type { Snippet } from 'svelte';
  import { X } from 'lucide-svelte';

  interface Props {
    open: boolean;
    title?: string;
    onclose?: () => void;
    children: Snippet;
  }

  let { open = $bindable(false), title, onclose, children }: Props = $props();

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) handleClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') handleClose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions a11y_no_noninteractive_element_interactions -->
  <div class="backdrop" onclick={handleBackdrop} role="presentation">
    <div class="modal" role="dialog" aria-modal="true" aria-label={title}>
      <div class="modal-header">
        {#if title}
          <h2 class="modal-title">{title}</h2>
        {/if}
        <button class="close-btn" onclick={handleClose} aria-label="Close">
          <X size={20} />
        </button>
      </div>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.15s ease;
  }

  .modal {
    background: var(--color-surface);
    border-radius: 16px;
    border: 1px solid var(--color-border);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .modal-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
    color: var(--color-text);
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    display: flex;
  }

  .close-btn:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  .modal-body {
    padding: 1.5rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
