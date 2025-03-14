document.addEventListener("DOMContentLoaded", function(){
  setTimeout(function(){
    const collapsibleHeaders = document.querySelectorAll(".collapsible-header");

    collapsibleHeaders.forEach(header => {
      header.addEventListener("click", function(){
        const collapsible = header.parentElement;
        toggleCollapsible(collapsible);
      });
    });
  }, 100); // Adjust the delay as needed
});




export function toggleCollapsible(collapsible) {
  let header = collapsible.querySelector(".collapsible-header");
  let content = collapsible.querySelector(".collapsible-content");
  
  collapsible.classList.toggle("active");
  header.classList.toggle("active");

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
} else {
    content.style.maxHeight = content.scrollHeight + "px";
}
  // updateParentCollapsibles(content);
}

function updateParentCollapsibles(element) {
  let parent = element.parentElement;
  while (parent) {
      if (parent.classList.contains("collapsible-content")) {
          parent.style.maxHeight = parent.scrollHeight + element.scrollHeight + "px";
      }
      parent = parent.parentElement;
  }
}

function closeNestedCollapsibles(element) {
  let nestedCollapsibles = element.querySelectorAll(".collapsible");
  nestedCollapsibles.forEach(nested => {
      let nestedContent = nested.querySelector(".collapsible-content");
      nestedContent.style.maxHeight = null;
      let nestedHeader = nested.querySelector(".collapsible-header");
      if (nestedHeader.classList.contains("active")) {
          nestedHeader.classList.remove("active");
      }

      if (nested.classList.contains("active")) {
        nested.classList.remove("active");
      }
  });
}


