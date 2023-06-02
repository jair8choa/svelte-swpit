<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { fade } from 'svelte/transition';
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import { user } from "../stores/Store";
  import {URLAPI} from '../utils/utils.js'

  let promiseEncuestas = []
  let nombreEncuesta = "ex"

  onMount(() => {
    if(!user) navigate('/', {replace: true})
    promiseEncuestas = getEncuestas()
  });

  const getEncuestas = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const res = await fetch(URLAPI+"/encuesta/", options);
    const json = await res.json();
    return json;
  };

</script>

<svelte:head>
  <!-- <link rel="stylesheet" type="text/css" href="/css/style_home.css" /> -->
  <link rel="stylesheet" type="text/css" href="/css/style_form.css" />
</svelte:head>

<div class="container">
  <div class="main">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline" />
      </div>

      <div class="user">
        <img src="./svelte-swpit/imgs/login-icon.png" alt="" />
      </div>
    </div>

    <div class="cardBox" transition:fade>
      {#await promiseEncuestas}
        <p>...waiting</p>
      {:then encuestas} 
        {#each encuestas as encuesta}
          <Link to={"/encuesta/"+encuesta.idEncuesta}>
            <div class="card">
              <div>
                <div class="numbers">{encuesta.idEncuesta}</div>
                <div class="cardName">{encuesta.Nombre}</div>
                <Link to={"/resultados/"+encuesta.Nombre+"/"+encuesta.idEncuesta} class="text-secondary">Resultado</Link>
              </div>
              <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
            </div>
          </Link>
        {/each}
      {:catch error}
        <p class="text-center text-danger">{error}</p>
      {/await}
    </div>
  </div>
  <Navbar></Navbar>
</div>
