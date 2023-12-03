<script lang="ts">
  import DeviceData from './components/DeviceData.svelte';
</script>

<div class="container">
  <DeviceData />
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 840px;
    margin: 0 auto;
    padding: 15px 30px 0 30px;
  }
</style>
