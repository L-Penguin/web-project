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

export default {
  name: 'App',
  components: {
    Home,
    InfoTable,
  },
}
</script>

<style>

</style>
