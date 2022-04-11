fetch("https://api.spacex.land/graphql/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
        query {
            rockets {
                boosters
                cost_per_launch
                height {
                  meters
                }
                name
                success_rate_pct
              }
            }  
        `,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
