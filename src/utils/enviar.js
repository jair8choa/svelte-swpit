import { Router, Link, Route, navigate } from "svelte-routing";

const enviar = (respuestas, token, id_encuesta) => {
  respuestas = respuestas.map((element) => {
    return element.filter((i) => i != "" && i != null);
  });

  const body = {
    respuestas,
    id_encuesta,
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "*/*",
    },
    body: JSON.stringify(body),
  };

  // fetch("https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/resultados", options)
  fetch("https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/resultados", options)
    .then((response) => response.text())
    .then((data) => {
      navigate("/resultados"+id_encuesta, { replace: true });
    })
    .catch((error) => {
      navigate("/encuestas", { replace: true });
    });
};

const terminarSesion = ()=>{
  alert("Tu sesion ha terminado, inicia sesion de nuevo")
  localStorage.clear()
  navigate('/', {replace: true})
}

export { enviar, terminarSesion};
