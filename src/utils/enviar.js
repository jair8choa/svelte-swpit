import { Router, Link, Route, navigate } from "svelte-routing";
import { getCSRFToken } from "./cookies";
const enviar = (respuestas, csrf, id_encuesta) => {
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
      Accept: "*/*",
      XCSRFTOKEN: csrf,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  };

  console.log(options)

  // fetch("https://swpit-jwt-test-7cazqrq4mq-uc.a.run.app/encuesta/resultados", options)
  fetch("http://localhost:5050/encuesta/resultados", options)
    .then((response) => response.text())
    .then((data) => {
      navigate("/resultados"+id_encuesta, { replace: true });
    })
    .catch((error) => {
      navigate("/encuestas", { replace: true });
    });
};


export { enviar };
