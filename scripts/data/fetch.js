import { cleanData } from "./cleaning.js";
import { filterData } from "./filterData.js";

const fetchData = () =>
  fetch("https://api.spacex.land/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          launches(limit: 10){
            details
            launch_date_utc
            launch_year
            launch_site {
              site_name
            }
            links {
                flickr_images
              }
            launch_success
            rocket {
              rocket_name
            }
          }
        }     
        `,
    }),
  })
    .then((res) => res.json())
    .then(cleanData)
    .then(filterData);

export { fetchData };
