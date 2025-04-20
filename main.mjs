import "./src/register.mjs";
import { routes } from "./src/routes.mjs";

async function onHashChange() {
  const url = new URL(window.location);
  const hash = url.hash;
  console.log(hash);
  if (!Object.keys(routes).includes(hash)) {
    console.warn("unknown route");
    url.hash = "#home";
    window.location.href = url.toString();
    return;
  }
  const page = routes[hash];

  const appRoot = document.querySelector("app-root");
  appRoot.setHTMLUnsafe(page);
}

window.addEventListener("hashchange", onHashChange);
onHashChange();
