import { updateSidebar } from "./general.js"

function loadContent(){

  document.querySelector('.text-module-title').innerHTML = document.title

  updateSidebar()

}

loadContent()