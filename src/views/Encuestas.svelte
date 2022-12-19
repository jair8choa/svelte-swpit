<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { fade } from 'svelte/transition';
  import { user } from "../stores/User";
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";

  onMount(() => {
    let token = localStorage.getItem('token')
		let user_id = localStorage.getItem('user_id')
    if(!token && !user_id) navigate('/', {replace: true})
  });
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="./css/style_home.css" />
  <link rel="stylesheet" type="text/css" href="./css/style_form.css" />

</svelte:head>

<div class="container">
  <div class="main">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline" />
      </div>

      <div class="user">
        <img src="./imgs/login-icon.png" alt="" />
      </div>
    </div>

    <div class="cardBox" transition:fade>
      <Link to="/encuesta1" replace={true}>
        <div class="card">
          <div>
            <div class="numbers">1</div>
            <div class="cardName">ENCUESTA SOBRE LAS HABILIDADES DE ESTUDIO</div>
            <Link to="/resultados1" replace={true} class="text-secondary">Resultado</Link>
          </div>
          <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
        </div>
      </Link>
      <Link to="/encuesta2" replace={true}>
        <div class="card">
          <div>
            <div class="numbers">2</div>
            <div class="cardName">TEST DE ASERTIVIDAD</div>
            <Link to="/resultados2" replace={true}>Resultado</Link>
          </div>
          <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
        </div>
      </Link>
      <Link to="/encuesta3" replace>
        <div class="card">
          <div>
            <div class="numbers">3</div>
            <div class="cardName">INVENTARIO SOBRE CANALES DE APRENDIZAJE</div>
            <Link to="/resultados3">Resultado</Link>
          </div>
          <div class="iconBx"><ion-icon name="accessibility-outline" /></div>
        </div>
      </Link>
    </div>
  </div>
  <Navbar></Navbar>
</div>
