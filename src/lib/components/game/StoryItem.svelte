<script lang="ts">
  import type { Story } from '../../types/game';
  import { Trash2, CheckCircle } from 'lucide-svelte';

  interface Props {
    story: Story;
    active?: boolean;
    onclick?: () => void;
    ondelete?: () => void;
  }

  let { story, active = false, onclick, ondelete }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
<div class="story-item" class:active {onclick} role="button" tabindex="0">
  <div class="story-content">
    <span class="story-title">{story.title}</span>
    {#if story.estimate}
      <span class="story-estimate">
        <CheckCircle size={12} />
        {story.estimate}
      </span>
    {/if}
  </div>
  {#if ondelete}
    <button
      class="delete-btn"
      onclick={(e) => { e.stopPropagation(); ondelete?.(); }}
      aria-label="Delete story"
    >
      <Trash2 size={14} />
    </button>
  {/if}
</div>

<style>
  .story-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.625rem 0.875rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .story-item:hover {
    background: var(--color-surface-hover);
  }

  .story-item.active {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }

  .story-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  .story-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .story-estimate {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-success);
    background: var(--color-success-light);
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
    flex-shrink: 0;
  }

  .delete-btn {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    display: flex;
    opacity: 0;
    transition: all 0.15s ease;
  }

  .story-item:hover .delete-btn {
    opacity: 1;
  }

  .delete-btn:hover {
    color: var(--color-danger);
    background: var(--color-danger-light);
  }
</style>
