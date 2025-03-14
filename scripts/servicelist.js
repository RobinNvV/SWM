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
      originalGroupedData = groupedData;
      callback(groupedData);
    }
  });
}

function loadContent(groupedData){
  generateModuleList(groupedData)

  document.querySelector('.text-module-title').innerHTML = document.title

  updateSidebar()

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


function generateModuleList(groupedData){

  console.log(groupedData)

  let modulesHTML = '';

  Object.keys(groupedData).forEach(contentId => {

    const pageInfo = groupedData[contentId];
    if (pageInfo[0].pageType === "4") {
      const titleRow = pageInfo.find(info => info.objectId === '1');
      const authorRows = pageInfo.filter(info => info.objectId === '11');
  
      const title = titleRow ? titleRow.name : 'Unknown Title';
      const authors = authorRows.map(authorRow => authorRow.name).join(', ');
      
      modulesHTML += `<a class="nav-link" href="main.html?contentId=${contentId}">
      <div class="div-service-preview js-service-preview"
      data-service-name="${title}">
          <div class="div-service-title">
            <p class="service-title">
              ${title}
            </p>
          </div>
      
            <div class="div-service-text">
              <p class="service-author">
                Author(s): ${authors}
              </p>
            </div>
        </div>
      </a>`;
    }


    });
  document.querySelector('.js-service-grid').innerHTML = modulesHTML;
}


document.querySelectorAll('.js-service-preview').forEach((div) => {
    div.addEventListener('click', () => {
      console.log(div.dataset)
    });
  });

loadCSV('moduledata.csv', loadContent)
