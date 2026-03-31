<script lang="ts">
  interface Props {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    src?: string;
  }

  let { name, size = 'md', src }: Props = $props();

  const initials = $derived(
    name
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  );

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4'];
  const colorIndex = $derived(
    name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length
  );
</script>

<div class="avatar avatar-{size}" style:background-color={src ? 'transparent' : colors[colorIndex]}>
  {#if src}
    <img {src} alt={name} />
  {:else}
    <span>{initials}</span>
  {/if}
</div>

<style>
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    font-weight: 700;
    flex-shrink: 0;
  }

  .avatar-sm { width: 28px; height: 28px; font-size: 0.6875rem; }
  .avatar-md { width: 36px; height: 36px; font-size: 0.8125rem; }
  .avatar-lg { width: 48px; height: 48px; font-size: 1rem; }

  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
