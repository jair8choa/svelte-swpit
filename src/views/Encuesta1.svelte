<script>
  import { fade } from 'svelte/transition';
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import {enviar} from "../utils/enviar"
  import { navigate } from "svelte-routing";
  import { user } from "../stores/Store";


  let promise = {};
  let secciones = []
  let respuestas = [[],[],[]]
  let token = ""

  onMount(() => {
    if(!$user) navigate('/', {replace: true})
    promise = getPreguntas();
  });

  const getPreguntas = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const res = await fetch("http://localhost:5050/encuesta/1", options);
    const json = await res.json();
    secciones = json.Secciones
    return json;
  };

  const calificar = ()=>{
    if(respuestas[0].length >= 20 && respuestas[1].length >= 20 && respuestas[2].length >= 20){
      enviar(respuestas,$user.csrf, 1)
    }else{
      alert("Contesta todas las pregunas!")
    }
  }

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
    <form class="center">
      {#await promise}
        <p>...waiting</p>
      {:then data}
        <div class="d-flex justify-content-center text-muted">
          <h1 class="text-center">{data.Nombre}</h1>
        </div>
        {#each secciones as seccion, s}
          <div class="d-flex justify-content-start p-3 text-muted">
            <h2>{seccion.Titulo}</h2>
          </div>

          <div class="cardBox" transition:fade>
            {#each seccion.Preguntas as pregunta, i}
              <div class="card">
                <label class="cardName">{pregunta.TituloPregunta}</label>
                <br />
                <fieldset>
                  <div class="form-check">
                    <input
                      class="opcion form-check-input"
                      type="radio"
                      id="opcion-si-{seccion.idSeccion}-{i}"
                      name="pregunta-{seccion.idSeccion}-{i}"
                      value="1"
                      bind:group={respuestas[s][i]}
                      required
                    />
                    <label class="numbers" for="opcion-si-{seccion.idSeccion}-{i}"
                      >Sí</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      class="opcion form-check-input"
                      type="radio"
                      id="opcion-no-{seccion.idSeccion}-{i}"
                      name="pregunta-{seccion.idSeccion}-{i}"
                      value="0"
                      bind:group={respuestas[s][i]}
                    />
                    <label class="numbers" for="opcion-no-{seccion.idSeccion}-{i}"
                      >No</label
                    >
                  </div>
                </fieldset>
              </div>
              <!-- cards -->
            {/each}
          </div>
        {/each}
        <div class="d-flex justify-content-center">
          <button class="centrar  centrar btn btn-outline-primary" type="submit" value="submit" on:click={calificar}> Enviar </button>
        </div>
        <br>
      {:catch error}
        <p class="text-center text-danger">{error}</p>
      {/await}
      </form>
  </div>
  <Navbar />
