<script lang="ts">
  interface Props {
    checked?: boolean;
    label?: string;
    onchange?: (checked: boolean) => void;
  }

  let { checked = $bindable(false), label, onchange }: Props = $props();

  function toggle() {
    checked = !checked;
    onchange?.(checked);
  }
</script>

<label class="switch-wrapper">
  <button
    class="switch"
    class:active={checked}
    onclick={toggle}
    role="switch"
    aria-checked={checked}
    aria-label={label ?? 'Toggle'}
  >
    <span class="switch-thumb"></span>
  </button>
  {#if label}
    <span class="switch-label">{label}</span>
  {/if}
</label>

<style>
  .switch-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .switch {
    position: relative;
    width: 44px;
    height: 24px;
    border: none;
    border-radius: 12px;
    background: var(--color-border);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s ease;
  }

  .switch.active {
    background: var(--color-primary);
  }

  .switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .switch.active .switch-thumb {
    transform: translateX(20px);
  }

  .switch-label {
    font-size: 0.875rem;
    color: var(--color-text);
  }
</style>
