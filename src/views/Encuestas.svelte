<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { fade } from 'svelte/transition';
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import { user } from "../stores/Store";

  onMount(() => {
    if(!user) navigate('/', {replace: true})
  });
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_home.css" />
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_form.css" />

</svelte:head>

<div class="container">
  <div class="main">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline" />
      </div>

      <div class="user">
        <img src="/svelte-swpit/imgs/login-icon.png" alt="" />
      </div>
    </div>

    <div class="cardBox" transition:fade>
      <Link to="/encuesta1">
        <div class="card">
          <div>
            <div class="numbers">1</div>
            <div class="cardName">ENCUESTA SOBRE LAS HABILIDADES DE ESTUDIO</div>
            <Link to="/resultados1" class="text-secondary">Resultado</Link>
          </div>
          <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
        </div>
      </Link>
      <Link to="/encuesta2">
        <div class="card">
          <div>
            <div class="numbers">2</div>
            <div class="cardName">TEST DE ASERTIVIDAD</div>
            <Link to="/resultados2" >Resultado</Link>
          </div>
          <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
        </div>
      </Link>
      <Link to="/encuesta3">
        <div class="card">
          <div>
            <div class="numbers">3</div>
            <div class="cardName">INVENTARIO SOBRE CANALES DE APRENDIZAJE</div>
            <Link class="link-primary" to="resultados3" replace>Resultado</Link>
          </div>
          <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
        </div>
      </Link>
    </div>
  </div>
  <Navbar></Navbar>
</div>
