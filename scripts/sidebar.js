const menuIcon = document.querySelector('.js-menu-icon');
if (menuIcon){
  menuIcon.addEventListener('click', toggleSidebar);
}

const infoIcon = document.querySelector('.js-info-icon');
if (infoIcon){
  infoIcon.addEventListener('click', toggleInfobar);

}

let toggleSideStatus = 0;
let toggleInfoStatus = 0;

function toggleSidebar() {
  // menu_icon_box.classList.toggle("active");

  const sidebar = document.querySelector(".div-sidebar");
  const header = document.querySelector(".div-header");
  const menu_icon_box = document.querySelector(".div-menu-icon");
  const body = document.body

  menu_icon_box.classList.toggle("active");
  sidebar.classList.toggle("active");


  if (toggleSideStatus == 1) {
    sidebar.style.left = "-250px";
    header.style.left = "0px"
    body.style.paddingLeft = "24px"
    toggleSideStatus = 0;
  } else if (toggleSideStatus == 0) {
    sidebar.style.left = "0px";
    header.style.left = "250px"
    body.style.paddingLeft = "274px"
    toggleSideStatus = 1;
  }
  // Add a delay before calling imageMapResize

  if (document.querySelector(".div-equipment-grid")) {
    setTimeout(function() {
      imageMapResize();
    }, 500); 
  }
}

function toggleInfobar() {
  const infobar = document.querySelector(".div-right-infobar");
  const body = document.body

  if (toggleInfoStatus == 1){
    infobar.style.right = "-200px";
    body.style.paddingRight = "24px";
    toggleInfoStatus = 0;
  } else if (toggleInfoStatus == 0){
    infobar.style.right = "0px";
    body.style.paddingRight = "224px";
    toggleInfoStatus =1;
  }
}

function loadSidebar() {
  console.log('here')
  const sidebarHTML = `       
        <nav class="nav-sidebar">
        <div class="div-sidebar-header">
          <h3> Navigation</h3>
        </div>

        <div class="div-sidebar-content">
          <p class="text-module-title"></p>

          <ul class="ul-sidebar list-unstyled-components">
            <li id="nav-home">
              <a class="collapsible-header">Home</a>
              <ul class="collapsible-content list-unstyled-components" id="homeSubmenu">
                <li><a href='modulelist.html'>How to Build This?</a></li>
                <li><a href='equipmentlist.html'>What can this Equipment do?</a></li>
                <li><a href='servicelist.html'>What can this Department do?</a></li>
              </ul>
            </li>
            <li id="nav-external">
              <a class="collapsible-header">External Links (2)</a>
              <ul class="collapsible-content list-unstyled-components">
                <li><a href='https://vanoord01.sharepoint.com/sites/voms'>VOMS</a></li>
                <li><a href='https://vanoord01.sharepoint.com/sites/Project-Toolkit'>Project Toolkit</a></li>
              </ul>
            </li>
            <li class="filled-sidebar" id="nav-modules">
              <a class="collapsible-header">Work Modules (3)</a>
              <ul class="collapsible-content list-unstyled-components" data-object-id="3">
              </ul>
            </li>
            <li class="filled-sidebar" id="nav-services">
              <a class="collapsible-header">Services (4)</a>
              <ul class="collapsible-content list-unstyled-components" data-object-id="4">
              </ul>
            </li>
            <li class="filled-sidebar" id="nav-equipment">
              <a class="collapsible-header">Equipment (4)</a>
              <ul class="collapsible-content list-unstyled-components" data-object-id="12">
              </ul>
            </li>
          </ul>
        </div>
        
      </nav>`

  document.querySelector('.div-sidebar').innerHTML = sidebarHTML

}

loadSidebar()




// https://codepen.io/truongtx-ccvn/pen/qLXGKV