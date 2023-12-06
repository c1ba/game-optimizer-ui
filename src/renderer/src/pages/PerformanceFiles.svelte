<script lang="ts">
  import { PerformanceFilesStore } from "../stores/PerformanceFilesStore"

  export let performanceFilesPage: boolean;
  
  $: data = [];

  PerformanceFilesStore().subscribe((value) => {
    data = value;
  })

</script>
<div class="page">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <h3 class="link" on:click={() => performanceFilesPage = false}>Back</h3>
    {#each data as elem}
       <h4>By: {elem.by}</h4>
       {#each elem.files as file}
            <h4>{file.name}</h4>
        {/each}
    {/each}
</div>
<style>
    .page {
        background-color: var(--background-primary);
        position: absolute; 
        width: 100vw; 
        height: 100vh;
        z-index: 2;
    }

    .link {
        cursor: pointer;
    }
</style>