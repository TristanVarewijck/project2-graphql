const launchesSection = document.getElementById("launchSection");
const buttons = document.querySelectorAll(".flex > ul li button");
const popUp = document.getElementById("pop-up");

const filterData = (items) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const active = document.querySelector(".active");
      const value = button.value;
      filterItems(value);
      button.classList.add("active");
      popUp.style.display = "block";

      if (active) {
        active.classList.remove("active");
      }
    });
  });

  const filterItems = (value) => {
    while (launchesSection.firstChild) {
      launchesSection.removeChild(launchesSection.firstChild);
    }

    let filteredItems = items.filter((item) => item.launch_year === value);
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
      console.log(launchContainer);
    });
  };
};

export { filterData };
