function updateSidebar(){

  const sidebarLists = document.querySelectorAll('.filled-sidebar');
  sidebarLists.forEach(list => {
    const ul = list.querySelector('ul')
    if (ul && ul.children.length === 0) {
        list.classList.add('hidden');
    }
  });
}

export {updateSidebar}