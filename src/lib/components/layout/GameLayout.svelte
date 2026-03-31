<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    sidebar?: Snippet;
    children: Snippet;
    footer?: Snippet;
  }

  let { sidebar, children, footer }: Props = $props();
</script>

<div class="game-layout">
  {#if sidebar}
    <aside class="game-sidebar">
      {@render sidebar()}
    </aside>
  {/if}

  <main class="game-main">
    <div class="game-content">
      {@render children()}
    </div>

    {#if footer}
      <div class="game-footer">
        {@render footer()}
      </div>
    {/if}
  </main>
</div>

<style>
  .game-layout {
    display: flex;
    flex: 1;
    min-height: 0;
  }

  .game-sidebar {
    width: 300px;
    flex-shrink: 0;
    border-right: 1px solid var(--color-border);
    padding: 1.25rem;
    overflow-y: auto;
    background: var(--color-surface);
  }

  .game-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .game-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 1.5rem;
  }

  .game-footer {
    padding: 1rem 2rem;
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  @media (max-width: 768px) {
    .game-layout {
      flex-direction: column;
    }

    .game-sidebar {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--color-border);
      max-height: 200px;
    }
  }
</style>
