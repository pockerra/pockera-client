<script lang="ts">
  import { userStore } from '../../stores/user.svelte';
  import Avatar from '../ui/Avatar.svelte';
  import { Spade } from 'lucide-svelte';

  interface Props {
    showUser?: boolean;
  }

  let { showUser = true }: Props = $props();
</script>

<header class="header">
  <a href="#/" class="logo">
    <Spade size={24} />
    <span>Pockerra</span>
  </a>

  {#if showUser && userStore.isLoggedIn}
    <div class="user-info">
      <Avatar name={userStore.name} size="sm" />
      <span class="user-name">{userStore.name}</span>
    </div>
  {/if}
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--color-text);
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .logo :global(svg) {
    color: var(--color-primary);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
  }
</style>
