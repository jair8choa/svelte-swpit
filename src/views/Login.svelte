<script>
    import { Router, Link, Route, navigate } from "svelte-routing";
    import {onMount} from 'svelte'
    import { user } from "../stores/Store.js";
    import { URLAPI } from "../utils/utils.js";
    let username;
    let password;

    onMount(()=>{
      if($user) navigate('/svelte-swpit/home', {replace: true})
    })

    const login = async () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("typeuser", 'student');

      const options = {
        method: "POST",
        body: formData,
        credentials: "include",
      };

      const response = await fetch(URLAPI+"/auth/login", options)
      const data = await response.json()
      const status = await response.status
      if(status == 200){
        user.login(data)
        navigate('/svelte-swpit/home', {replace: true})
      }else{
        alert("Contraseña o Usuario Incorrecto")
        username = ""
        password = ""
      }

    };
  </script>

  <svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
    <script src="https://kit.fontawesome.com/7e5b2d153f.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/svelte-swpit/css/style.css" />
    <script defer src="/svelte-swpit/js/index.js"></script>
  </svelte:head>
  <header class="header">
    <nav class="nav">
      <button class="nav-toggle" aria-label="Abrir menú">
        <i class="fas fa-bars" />
      </button>
      <ul class="nav-menu">
        <li class="nav-menu-item">
          <a href="/svelte-swpit/" class="nav-menu-link nav-link ">Alumnos</a>
        </li>
        <li class="nav-menu-item">
          <a href="/svelte-swpit/" class="nav-menu-link nav-link">Personal</a>
        </li>
        <li class="nav-menu-item">
          <a href="/svelte-swpit/" class="nav-menu-link nav-link">Padres</a>
        </li>
      </ul>
    </nav>
  </header>
  
  <main class=" d-flex justify-content-center align-items-center vh-100">
    <div
      class="bg-white p-5 rounded-5 text-secondary shadow"
      style="width: 30rem"
    >
      <div class="d-flex justify-content-center">
        <img
          src="/svelte-swpit/assets/login-icon.png"
          alt="login-icon"
          style="height: 7rem"
        />
      </div>
      <div class="text-center fs-1 fw-bold">Inicio de Sesión</div>
      <!-- <div>
          <nav>
            <a href="#">Alumno</a>
            <a href="#">Personal</a>
            <a href="#">Padres de Familia</a>
            <div class="animation start-home"></div>
          </nav>
        </div> -->
      <form on:submit|preventDefault={login}>
        <div class=" mt-4 ">
          <input
            class="form-control bg-light"
            type="text"
            placeholder="Usuario"
            id="username"
            bind:value={username}
            required
          />
        </div>
        <div class=" mt-1">
          <input
            class="form-control bg-light"
            type="password"
            placeholder="Contraseña"
            id="password"
            bind:value={password}
            required
          />
        </div>
        <!-- <div class="d-flex justify-content-end mt-2">
              <div class="d-flex align-items-center gap-1">
                  <input class="form-check-input" type="checkbox" />
                  <div class="pt-1" style="font-size: 0.9rem">Recuerdame</div>
              </div>
              <div class=" d-flex pt-1 justify-content-end">
                  <a
                      href="#"
                      class="text-decoration-none text-info fw-semibold fst-italic"
                      style="font-size: 0.9rem">¿Olvidaste tu contraseña?</a
                  >
              </div>
          </div> -->
        <button
          type="submit"
          class="btn  text-white w-100 mt-4 fw-semibold shadow-sm bgcolor"
          >Iniciar Sesión</button
        >
      </form>
    </div>
  </main>
  