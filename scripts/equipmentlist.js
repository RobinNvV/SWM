import { updateSidebar } from "./general.js"

function loadContent(){
  imageMapResize()
  document.querySelector('.text-module-title').innerHTML = document.title

  updateSidebar()
}

loadContent()