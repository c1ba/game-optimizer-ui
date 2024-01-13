<script lang="ts">
  import { DeviceStore } from "../stores/DeviceStore"
  $: data = undefined;
  window.electron.ipcRenderer.on('get-device-data', (_evt, message) => {
    data = message;
    DeviceStore.update(
      () => ({
        processor: {
          name: message.processor.brand,
          capacity: parseFloat(message.processor.speed)
        },
        graphicsCard: {
          name: message.graphics.controllers[0].model,
          capacity: message.graphics.controllers[0].vram / 1024
        },
        ram: {
          capacity: Math.round((message.ram.total * Math.pow(10, -9)) - (message.ram.swaptotal * Math.pow(10, -9)))
        }
      })
    )
  })

  $: processor = data?.processor;
  $: graphics = data?.graphics;
  $: ram = data?.ram;
</script>

<div class="header_container">
  <h2 style="margin-bottom: 25px; font-family: 'Menlo', 'Lucida Console', monospace; font-weight: 300;">Your Device:</h2>
  <ul class="versions">
    {#if data}
    <li>{processor.brand} - {processor.speed} GHz</li>
    {#if graphics}
    {#each graphics.controllers as controller}
      <li>{controller.model} - {controller.vram / 1024} GB</li>
    {/each }
    {/if}
    <li>{Math.round((ram.total * Math.pow(10, -9)) - (ram.swaptotal * Math.pow(10, -9)))} GB RAM</li>
    {/if}
  </ul>
</div>

<style>
  .header_container{
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 100%;
    z-index: 3;
    background-color: var(--background-code);
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    color: var(--text-code);
  }
  .versions {
    margin: 0 auto;
    float: none;
    clear: both;
    overflow: hidden;
    font-family: 'Menlo', 'Lucida Console', monospace;
    line-height: 1;
    transition: all 0.3s;
  }

  .versions li {
    display: block;
    float: left;
    border-right: 1px solid rgba(194, 245, 255, 0.4);
    padding: 0 20px;
    font-size: 13px;
    opacity: 0.8;
  }

  .versions li:last-child {
    border: none;
  }

  @media (max-width: 840px) {
    .versions {
      display: none;
    }
  }
</style>
