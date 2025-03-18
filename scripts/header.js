function loadHeader() {
  const headerHTML = `<div class="div-top-header">
        <div class="div-header-left">
          <div class="div-menu-icon js-menu-icon">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </div>
          <h1 class="text-module-title" data-object-id="1">
          </h1>
        </div>

        <div class="div-header-center">
          <input id="search-bar" type="text" placeholder="Search">
          <button class="search-button">
            <img class="search-icon" src="icons/search.svg">
          </button>
        </div>

        <div class="div-header-right">
          <img class="VOLogo" src="Images/VOLogo.iix">
        </div>
      </div>

      <div class="div-bottom-header">
        <div id="breadcrumb">

        </div>
        <ul class="ul-breadcrumb">
        </ul>
        <!--
        <img class="hamburger-menu js-info-icon" src="icons/hamburger-menu.svg">
        -->
      </div>`

  document.querySelector('.div-header').innerHTML = headerHTML


}

loadHeader()