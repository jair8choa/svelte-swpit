<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Home from "./views/Home.svelte";
  import Login from "./views/Login.svelte";
  import Encuestas from "./views/Encuestas.svelte";
  import Encuesta from "./views/Encuesta.svelte";
  import Resultados from "./views/Resultados.svelte";
  import {onMount} from 'svelte'
  import { user } from "./stores/Store.js";
    import Resultados1 from "./views/Resultados1.svelte";
    import {URLAPI} from './utils/utils'

  
  onMount(async()=>{
      const response = await fetch(URLAPI+'/auth/check', {method: 'GET', credentials: "include"})
      const status = await response.status
      const data = await response.json();
      if(status === 200){
        user.login(data)
        navigate('/svelte-swpit/home', {replace: true})
      }else{
        navigate('/svelte-swpit', {replace: true})
      } 
  })



</script>

<Router>
  <Route path="/svelte-swpit">
    <Login />
  </Route>
  <Route path="/svelte-swpit/home">
    <Home />
  </Route>
  <Route path="/svelte-swpit/encuestas">
    <Encuestas />
  </Route>
  <Route path="/svelte-swpit/encuesta/:id" let:params>
    <Encuesta encuestaId="{params.id}" />
  </Route>
  <Route path="/svelte-swpit/resultados/:nombre/:id" let:params>
    <Resultados encuestaId="{params.id}" nombre='{params.nombre}'/>
  </Route>
</Router>
