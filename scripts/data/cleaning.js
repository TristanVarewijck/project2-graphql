const launchesSection = document.getElementById("launchSection");

const cleanData = (data, index) => {
  let items = data.data.launches;

  items.map((item) => {
    const launchesContents = `
      <div>
      <h1>${item.launch_success}</h1>
      </div>   
      
`;
    const launchContainer = document.createElement("li");
    launchContainer.className = `launch + ${index}`;
    launchContainer.innerHTML = launchesContents;
    launchesSection.appendChild(launchContainer);
  });

  return items;
};

// PARSE PUBLISH DATE
// function parseDate(publishedAt) {
//   publishedAt = new Date(publishedAt);
//   publishedAt = publishedAt.toString().substring(3, 25);
//   publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);
//   return publishedAt;
// }

export { cleanData };
