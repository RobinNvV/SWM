$(document).ready(function(){
  setTimeout(function(){
    updateCurrentPageBreadcrumb(); // Update the breadcrumb when the page loads
    showBreadCrumb(); // Show the breadcrumb when you arrive on the new page
  }, 100); // Adjust the delay as needed

  // Listen for the popstate event to handle back button navigation
  window.addEventListener('popstate', function(event) {
    updateCurrentPageBreadcrumb();
    showBreadCrumb();
  });
});

function updateCurrentPageBreadcrumb() {
  if (typeof (Storage) != "undefined") {
    let currentPage = document.title; // Assuming the page title is the current page name
    let currentPageLink = window.location.href; // Get the current page URL

    if (window.location.pathname.includes('main.html')) {
      if (sessionStorage.breadcrumb) {
        let breadcrumb = sessionStorage.breadcrumb;
        let breadcrumbArray = breadcrumb.split(" > ");

        // Check if the current page title is already in the breadcrumb
        let pageIndex = breadcrumbArray.findIndex(function(item) {
          return item.includes(currentPage);
        });

        if (pageIndex !== -1) {
          // If the current page title is found, remove all breadcrumbs after that page
          breadcrumbArray = breadcrumbArray.slice(0, pageIndex + 1);
        } else {
          // If the current page title is not found, add it to the breadcrumb
          breadcrumbArray.push("<a href='" + currentPageLink + "'>" + currentPage + "</a>");
        }

        sessionStorage.breadcrumb = breadcrumbArray.join(" > ");
      } else {
        // Initialize the breadcrumb with the current page
        sessionStorage.breadcrumb = "<a href='" + currentPageLink + "'>" + currentPage + "</a>";
      }
    } else {
      // Set predefined breadcrumbs for other pages
      if (window.location.pathname.includes('index.html')) {
        console.log('indexhtml 1')
        sessionStorage.breadcrumb = "<a href='index.html'>Home</a>"
      }
      else {
        console.log('indexhtml 2')
        sessionStorage.breadcrumb = "<a href='index.html'>Home</a> > <a href='" + currentPageLink + "'>" + currentPage + "</a>";
      }
    }
  }
}

function showBreadCrumb(){
  $("#breadcrumb").html(sessionStorage.breadcrumb);  
}