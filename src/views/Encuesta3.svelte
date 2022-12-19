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
    token = localStorage.getItem('token')
		let user_id = localStorage.getItem('user_id')
    if(!token && !user_id) navigate('/', {replace: true})
    console.log(token)
    promise = getPreguntas();
  });

  const getPreguntas = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const res = await fetch("https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/3", options);
    const json = await res.json();
    secciones = json.secciones;
    return json;
  };

  const calificar = () => {
    let res = respuestas[0].filter((i) => i != "");
    console.log(token)
    if (res.length >= 24) {
      enviar(respuestas,token, 3)
    } else {
      alert("Contesta todas las pregunas!");
    }
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="/svelte-swpit/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="/svelte-swpit/css/style_form.css" />
</svelte:head>

<div class="main">
  <div class="topbar">
    <div class="toggle">
      <ion-icon name="menu-outline" />
    </div>

    <div class="user">
      <img src="/svelte-swpit/imgs/login-icon.png" alt="" />
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
                  <select
                    name="select-1"
                    id="select1"
                    class="form-select form-select"
                    bind:value={respuestas[s][i]}
                  >
                    <option value="" selected disabled hidden
                      >Selecciona tu respuestas</option
                    >
                    <option value="1">Nunca</option>
                    <option value="2">Raramente</option>
                    <option value="3">Ocasionalmente</option>
                    <option value="4">Usualmente</option>
                    <option value="4">Siempre</option>
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
