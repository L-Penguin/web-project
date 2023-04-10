<template>
  <div id="app">
    <keep-alive>
			<router-view></router-view>
		</keep-alive>
  </div>
</template>

<script>
import Home from './views/Home'
import InfoTable from './views/InfoTable';
import InfoControl from './views/InfoControl';

export default {
  name: 'App',
  components: {
    Home,
    InfoTable,
    InfoControl,
  },
}
</script>

<style>
  h1 {
    text-align: center;
  }
</style>
