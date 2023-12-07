<script lang="ts">

    export let show: boolean = false;

    export let y: number;
    export let x: number;

    export let width: string;
    export let height: string;
</script>
{#if show}
    <div style="width: 100vw; height: 100vh; position: absolute;">
        <div class="mainContainer" style={`top: ${y}px; left: ${x}px; width: ${width}; height: ${height};`}>
            <slot />
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => show = !show} style="width: 100vw; height: 100vh; position: absolute; overflow: hidden; z-index: 1;" />
    </div>
{/if}
<style>
.mainContainer {
        background-color: var(--background-secondary);
        border-radius: 4px;
        position: absolute;
        z-index: 2;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
</style>