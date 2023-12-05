<script lang="ts">
    export let bindValue;
    export let data;
    export let name;

    const capacityType = (componentType: string) => {
        switch (componentType) {
            case 'PROCESSOR':
                return 'GHz';
            case 'GRAPHICS_CARD':
                return 'GB';
            case 'RAM':
                return 'GB';
            default:
                    return '';
        }
    }
</script>
<div>
<label for="dropdown">{name}</label>
<select name={name} id="dropdown" bind:value={bindValue} class="dropdownInput">
    <option>Select</option>
    {#each data as elem}
        <option class="optionInput" value={elem.id}>{elem.name ?? ""} {elem.capacity}{capacityType(elem.type)}</option>
    {/each}
</select>
</div>
<style>
    label {
        font-family: 'Menlo', 'Lucida Console', monospace;
        color: var(--text);
        font-weight: 500;
    }

    .dropdownInput {
        background-color: var(--background-primary);
        color: var(--text);
        font-family: 'Menlo', 'Lucida Console', monospace;
        border: none;
        border-radius: 2px;
        width: auto;
        height: 22px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
</style>