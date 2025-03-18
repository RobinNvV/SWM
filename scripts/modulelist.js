import { updateSidebar } from "./general.js";

let originalGroupedData = {};

function loadCSV(file, callback) {
  Papa.parse(file, {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.contentId]) {
          acc[item.contentId] = [];
        }
        acc[item.contentId].push(item);
        return acc;
      }, {});
      originalGroupedData = groupedData; // Store the original grouped data
      callback(groupedData);
    }
  });
}

function loadContent(groupedData){
  generateModuleList(groupedData);

  document.querySelector('.text-module-title').innerHTML = document.title;

  updateSidebar();
}

document.getElementById('search-bar').addEventListener('keyup', function() {
  let input = document.getElementById('search-bar').value.toLowerCase();

  let filteredData = Object.keys(originalGroupedData).reduce((acc, contentId) => {
    const pageInfo = originalGroupedData[contentId];
    
    // Check if any field in the pageInfo array contains the input
    const matches = pageInfo.some(info => {
      return Object.values(info).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(input)
      );
    });

    if (matches) {
      acc[contentId] = pageInfo;
    }

    return acc;
  }, {});

  generateModuleList(filteredData);
});


///////////////////////////////////////////////////////////

function generateModuleList(groupedData){
  let modulesHTML = '';

  Object.keys(groupedData).forEach(contentId => {
    const pageInfo = groupedData[contentId];
    if (pageInfo[0].pageType === "1") {
      const titleRow = pageInfo.find(info => info.objectId === '1');
      const authorRows = pageInfo.filter(info => info.objectId === '11');

      const title = titleRow ? titleRow.name : 'Unknown Title';
      let link = titleRow ? titleRow.link: 'No Link';
      const authors = authorRows.map(authorRow => authorRow.name).join(', ');
      if  (link === '') {
        link = `main.html?contentId=${contentId}`
      }
      modulesHTML += `<a class="nav-link" href="${link}">
      <div class="div-module-preview js-module-preview"
      data-module-name="${title}">
          <div class="div-module-title">
            <p class="module-title">
              Module: ${title}
            </p>
          </div>
      
            <div class="div-module-text">
              <p class="module-author">
                Author(s): ${authors}
              </p>
            </div>
        </div>
      </a>`;
    }
  });

  document.querySelector('.js-module-grid').innerHTML = modulesHTML;
}

document.querySelectorAll('.js-module-preview').forEach((div) => {
  div.addEventListener('click', () => {
    console.log(div.dataset);
  });
});

loadCSV('moduledata.csv', loadContent);
