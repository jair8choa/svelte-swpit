<script>
  import { user } from "../stores/User";
  import { fade } from 'svelte/transition';
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import {enviar} from "../utils/enviar"
  import { navigate } from "svelte-routing";

  let promise = {};
  let secciones = []
  let respuestas = [[],[],[]]
  let token = ""

  onMount(() => {
    token = localStorage.getItem('token')
		let user_id = localStorage.getItem('user_id')
    if(!token && !user_id) navigate('/', {replace: true})
    token = localStorage.getItem('token')
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
    const res = await fetch("https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/1", options);
    const json = await res.json();
    secciones = json.secciones
    return json;
  };

  const calificar = ()=>{
    if(respuestas[0].length >= 20 && respuestas[1].length >= 20 && respuestas[2].length >= 20){
      enviar(respuestas,token, 1)
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
              <div class="card">
                <label class="cardName">{pregunta.titulo}</label>
                <br />
                <fieldset>
                  <div class="form-check">
                    <input
                      class="opcion form-check-input"
                      type="radio"
                      id="opcion-si-{seccion.id}-{i}"
                      name="pregunta-{seccion.id}-{i}"
                      value="1"
                      bind:group={respuestas[s][i]}
                      required
                    />
                    <label class="numbers" for="opcion-si-{seccion.id}-{i}"
                      >Sí</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      class="opcion form-check-input"
                      type="radio"
                      id="opcion-no-{seccion.id}-{i}"
                      name="pregunta-{seccion.id}-{i}"
                      value="0"
                      bind:group={respuestas[s][i]}
                    />
                    <label class="numbers" for="opcion-no-{seccion.id}-{i}"
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
    </div>
  </div>
  <Navbar />
