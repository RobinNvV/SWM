import { updateSidebar } from "./general.js";

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function loadCSV(file, callback) {
  Papa.parse(file, {
      download: true,
      header: true,
      complete: function(results) {
          callback(results.data);
      }
  });
}

function populateTemplate(data) {
  const contentId = getUrlParameter('contentId');
  const contentData = data.filter(item => item.contentId === contentId);

  if (contentData.length > 0) {
      const templateId = contentData[0].templateId;
      loadTemplate(templateId, contentData);
  } else {
      console.error('Content not found for contentId:', contentId);
  }
}

function loadTemplate(templateId, contentData) {
    console.log(templateId)
    const templateMap = {
        '1': 'htmltemplates/template1.html',
        '2': 'htmltemplates/template2.html',
        '3': 'htmltemplates/template3.html',
    };
  
    const templateUrl = templateMap[templateId];
    if (templateUrl) {
        fetch(templateUrl)
            .then(response => response.text())
            .then(html => {
                document.getElementById('div-main-container').innerHTML = html;
                insertContent(contentData);

                const mainContainer = document.getElementById("div-main-container");
                if (mainContainer.children.length === 1) {
                    mainContainer.style.gridTemplateRows = "1fr";
                }

                updateSidebar()
            })
            .catch(error => {
                console.error('Error loading template:', error);
            });
    } else {
        console.error('Template not found for templateId:', templateId);
    }
}

function insertContent(contentData) {
    contentData.forEach(item => {
    const elements = document.querySelectorAll(`[data-object-id="${item.objectId}"]`);

    if (elements.length) {
        elements.forEach(element => {
            if (item.objectId == "6") {
                element.innerHTML += `
                <object data="${item.link}#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="500px">
                <p>Unable to display PDF file. <a href="${item.link}">Download</a> instead.</p>
                </object>
                `
            } else {

                if (element.tagName === 'UL') {
                    element.innerHTML += `
                    <li><a href="${item.link}">
                        ${item.name}
                    </a></li>
                `;
                } else {
                    element.innerHTML += `
                    <a href="${item.link}">
                        <p>${item.name}</p>
                    </a>
                `;
                }
            }

        })

        if (item.objectId == "1") {
            document.title = item.name
        }
    } else {
        console.error(`Element with data-object-id="${item.objectId}" not found.`);
    }
    });
}

  
// // Load and populate the template
loadCSV('moduledata.csv', populateTemplate);
