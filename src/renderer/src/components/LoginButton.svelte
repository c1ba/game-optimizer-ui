<script lang="ts">
  import ButtonPrimary from "./common/buttons/ButtonPrimary.svelte"

    export let isLoggedIn: boolean;
    export let onLogin: () => void;
    export let onLogout: () => void;
    export let texts: {login: string; logout: string};
    export let style: string = "";
</script>
{#if !isLoggedIn}
     <ButtonPrimary onClick={onLogin} text={texts.login} style={style} />
    {:else}
    <ButtonPrimary onClick={onLogout} text={texts.logout} style={style} />
{/if}