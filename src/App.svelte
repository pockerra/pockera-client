<script lang="ts">
  import Router from 'svelte-spa-router';
  import Header from './lib/components/layout/Header.svelte';
  import Footer from './lib/components/layout/Footer.svelte';
  import Home from './routes/Home.svelte';
  import Room from './routes/Room.svelte';
  import Join from './routes/Join.svelte';
  import NotFound from './routes/NotFound.svelte';

  const routes = {
    '/': Home,
    '/room/:id': Room,
    '/join/:id': Join,
    '*': NotFound,
  };
</script>

<div class="app">
  <Header />
  <div class="app-content">
    <Router {routes} />
  </div>
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .app-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
