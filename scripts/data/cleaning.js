// const launchesSection = document.getElementById("launchSection");

const cleanData = (data) => {
  let items = data.data.launches;
  items.map((item) => {
    //   CLEANING
    item.launch_date_utc = parseDate(item.launch_date_utc);
    item.links.flickr_images[0] = hasImage(item.links.flickr_images[0]);
    item.details = hasDetails(item.details);

    //     const launchesContents = `
    //       <article>
    //       <small>${item.launch_date_utc}</small>
    //       <h1>${item.rocket.rocket_name}</h1>
    //       <small> Launch site: <span>${item.launch_site.site_name}</span></small>
    //       <img src=${item.links.flickr_images[0]} alt=${item.launch_site.site_name} width="150px"/>
    //       <p>${item.details}</p>
    //       </article>
    // `;
    //     const launchContainer = document.createElement("li");
    //     launchContainer.innerHTML = launchesContents;
    //     launchesSection.appendChild(launchContainer);
    //   });
  });
  return items;
};

// PARSE PUBLISH DATE
function parseDate(launchDate) {
  launchDate = new Date(launchDate);
  launchDate = launchDate.toString().substring(3, 25);
  return launchDate;
}

function hasImage(image) {
  image ? (image = image) : (image = "../assets/images/placeholder.png");
  return image;
}

function hasDetails(details) {
  details ? (details = details) : (details = "-");
  return details;
}

export { cleanData };

