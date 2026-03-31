<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let { variant = 'primary', size = 'md', disabled = false, onclick, children }: Props = $props();
</script>

<button
  class="btn btn-{variant} btn-{size}"
  {disabled}
  {onclick}
>
  {@render children()}
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: inherit;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-sm { padding: 0.375rem 0.75rem; font-size: 0.8125rem; }
  .btn-md { padding: 0.5rem 1.25rem; font-size: 0.9375rem; }
  .btn-lg { padding: 0.75rem 1.75rem; font-size: 1.0625rem; }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }
  .btn-primary:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }

  .btn-secondary {
    background: var(--color-surface-elevated);
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }
  .btn-secondary:hover:not(:disabled) {
    background: var(--color-surface-hover);
  }

  .btn-ghost {
    background: transparent;
    color: var(--color-text-secondary);
  }
  .btn-ghost:hover:not(:disabled) {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  .btn-danger {
    background: var(--color-danger);
    color: white;
  }
  .btn-danger:hover:not(:disabled) {
    background: var(--color-danger-hover);
  }
</style>
