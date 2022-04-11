import { cleanData } from "./cleaning.js";

const fetchData = () =>
  fetch("https://api.spacex.land/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          launches {
            details
            launch_date_utc
            launch_site {
              site_name
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
    .then(cleanData);

export { fetchData };
