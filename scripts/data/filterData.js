const launchesSection = document.getElementById("launchSection");

const filterData = (items) => {
  let filteredItems = items.filter((item) => item.launch_year === "2015");
  console.log(filteredItems);

  filteredItems.forEach((item) => {
    const launchesContents = `
    <article>
    <small>${item.launch_date_utc}</small>
    <h1>${item.rocket.rocket_name}</h1>
    <small> Launch site: <span>${item.launch_site.site_name}</span></small>
    <img src=${item.links.flickr_images[0]} alt=${item.launch_site.site_name} width="150px"/>
    <p>${item.details}</p>
    </article>
`;
    const launchContainer = document.createElement("li");
    launchContainer.innerHTML = launchesContents;
    launchesSection.appendChild(launchContainer);
  });
};

export { filterData };
