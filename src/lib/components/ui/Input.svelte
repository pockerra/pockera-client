<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    label?: string;
    type?: string;
    disabled?: boolean;
    oninput?: (e: Event) => void;
  }

  let { value = $bindable(''), placeholder = '', label, type = 'text', disabled = false, oninput }: Props = $props();
</script>

<div class="input-group">
  {#if label}
    <label class="input-label" for={label}>{label}</label>
  {/if}
  <input
    class="input"
    id={label}
    {type}
    {placeholder}
    {disabled}
    bind:value
    {oninput}
  />
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .input-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .input {
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.9375rem;
    font-family: inherit;
    transition: border-color 0.15s ease;
  }

  .input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-ring);
  }

  .input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
