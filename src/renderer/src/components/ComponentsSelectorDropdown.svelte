<script lang="ts">
  import { ComponentsStore } from "../stores/ComponentsStore";
  import { PerformanceFilesStore } from "../stores/PerformanceFilesStore"
  import Dropdown from "./Dropdown.svelte"

    export let show: boolean;
    export let selectedGame: string;
    export let xPosition: number;
    export let yPosition: number;
    export let performanceFilesPage: boolean;

    $: data = {
        processors: [],
        graphicCards: [],
        rams: []
    };
    ComponentsStore().subscribe((value: any) => {
        data = value;
    });

    let selectedProcessor: string;
    let selectedGraphics: string;
    let selectedRam: string;

    const onSubmit = async () => {
        const response = await fetch(`http://localhost:8080/performance_files/${selectedGame}?processorId=${selectedProcessor}&graphicsId=${selectedGraphics}&ramId=${selectedRam}`, 
        {
            method: 'GET', 
        }
        );

        response.json().then((data) => {
            PerformanceFilesStore().set(data);
        });

        performanceFilesPage = true;
        show = false;
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div style="width: 100vw; height: 100vh; position: absolute;">
    <div class="mainContainer" style={`top: ${yPosition}px; left: ${xPosition}px;`}>
        <h4>Select your components</h4>
        {#if data.processors}
        <Dropdown bind:bindValue={selectedProcessor} name="Processor" data={data.processors} />
        {/if}
        {#if data.graphicCards}
        <Dropdown bind:bindValue={selectedGraphics} name="Graphic Card" data={data.graphicCards} />
        {/if}
        {#if data.rams}
        <Dropdown bind:bindValue={selectedRam} name="Ram" data={data.rams} />
        {/if}
        <button on:click={onSubmit}>Submit!</button>
    </div>
    <div on:click={() => show = !show} style="width: 100vw; height: 100vh; position: absolute; overflow: hidden; z-index: 1;">
    </div>
</div>
<style>
    .mainContainer {
        background-color: var(--background-secondary);
        border-radius: 4px;
        width: 50vw;
        height: 30vw;
        position: absolute;
        z-index: 2;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    button {
        text-decoration: none;
        background-color: var(--text);
        color: var(--background-primary);
        border: none;
        border-radius: 2px;
        width: 100px;
        height: 25px;
        font-family: 'Menlo', 'Lucida Console', monospace;
        cursor: pointer;
    }

    h4 {
        font-family: 'Menlo', 'Lucida Console', monospace;
        color: var(--text);
    }
</style>