<script lang="ts">
  import { api } from "../services/api"
  import { saveLogin } from "../stores/UserStore"
  import ButtonPrimary from "./Button/ButtonPrimary.svelte"

    export let showLogin: boolean;

    $: username = "";
    $: password = "";

    $: errorMessage = "";

    const resetErrorMessage = () => {
        if (errorMessage !== "") {
            errorMessage = "";
        }
    }

    const onSubmit = async () => {
        try {
            const requestBody = {
            username: username,
            password: password
            };

            const response = await api.post('/login', requestBody);
            saveLogin(response.data);
            showLogin = !showLogin;
        }
        catch (error) {
            console.error(error);
            switch (error.response.status) {
            case 403:
                errorMessage = "Wrong Credentials!";
                break;
            default:
                errorMessage = error.message;
                break;
            }
            
        }
    }
</script>
{#if showLogin}
    <div style="width: 100vw; height: 100vh; position: absolute; display: flex; align-items: center; justify-content: center;">
        <div class="mainContainer">
            <label for="username">Username:</label>
            <input type="text" id="username" on:keypress={resetErrorMessage} bind:value={username}/>

            <label for="password">Password:</label>
            <input type="password" id="password" on:keypress={resetErrorMessage} bind:value={password}/>
            <ButtonPrimary onClick={onSubmit} text="Log In!" />
            <p>{errorMessage}</p>
        </div>
        <!-- svelte-ignore missing-declaration -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => showLogin = !showLogin} style="width: 100vw; height: 100vh; position: absolute; overflow: hidden; z-index: 1;" />
    </div>
{/if}
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
</style>