<script>
  import { user } from "../stores/User";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import { enviar } from "../utils/enviar";
  import { navigate } from "svelte-routing";


  let promise = {};
  let secciones = [];
  let respuestas = [[]];
  let token = ""

  onMount(() => {
    // if (!$user) navigate("/", { replace: true });
    let token = localStorage.getItem('token')
		let user_id = localStorage.getItem('user_id')
    if(!token && !user_id) navigate('/', {replace: true})
    token = localStorage.getItem('token')
    promise = getPreguntas();
  });

  const getPreguntas = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const res = await fetch("http://localhost:5000/encuesta/2", options);
    const json = await res.json();
    secciones = json.secciones;
    return json;
  };

  const calificar = () => {
    let res = respuestas[0].filter(i=> i!='')
    if(res.length >= 9){
      enviar(respuestas, token, 2)
    }else{
      alert("Contesta todas las pregunas!")
    }
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="./css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="./css/style_form.css" />
</svelte:head>

<div class="main">
  <div class="topbar">
    <div class="toggle">
      <ion-icon name="menu-outline" />
    </div>

    <div class="user">
      <img src="./imgs/login-icon.png" alt="" />
    </div>
  </div>
  <!-- cards -->
  <div class="center">
    {#await promise}
      <p>...waiting</p>
    {:then data}
      <div class="d-flex justify-content-center text-muted">
        <h1>{data.titulo}</h1>
      </div>
      {#each secciones as seccion, s}
        <div class="d-flex justify-content-start p-3 text-muted">
          <h2>{seccion.titulo}</h2>
        </div>

        <div class="cardBox" transition:fade>
          {#each seccion.preguntas as pregunta, i}
            <div class="  card">
              <label class="cardName">{pregunta.titulo}</label>
              <br />
              <div>
                <div class="mb-3">
                  <select name="select-1" id="select1" class="form-select form-select" bind:value={respuestas[s][i]}>
                    <option value="" selected disabled hidden>Selecciona tu respuestas</option>
                    <option value=1>Con frecuencia</option>
                    <option value=2>De vez en cuando</option>
                    <option value=3>Casi nunca </option>
                    <option value=4>Nunca</option>
                  </select>
                  <!-- <label  for="opcion-si-1">Sí</label> -->
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/each}
      <div class="d-flex justify-content-center">
        <button class="centrar  centrar btn btn-outline-primary" type="submit" value="submit" on:click={calificar}>Enviar</button>
      </div>
      <br>
    {:catch error}
      <p class="text-center text-danger">{error}</p>
    {/await}
  </div>
</div>
<Navbar />
