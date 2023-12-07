<script lang="ts">
  import { api } from "../services/api"
  import { saveLogin } from "../stores/UserStore"
  import ButtonPrimary from './common/buttons/ButtonPrimary.svelte';
  import GeneralWindow from "./common/windows/GeneralWindow.svelte"

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
<GeneralWindow width={"50vw"} height={"30vh"} bind:show={showLogin}>
    <label for="username">Username:</label>
    <input type="text" id="username" on:keypress={resetErrorMessage} bind:value={username}/>

    <label for="password">Password:</label>
    <input type="password" id="password" on:keypress={resetErrorMessage} bind:value={password}/>
    <ButtonPrimary style="width: 125px; height: 35px; font-size: 17px;" onClick={onSubmit} text="Log In!" />
    <p>{errorMessage}</p>
</GeneralWindow>