// describe("Test login 1", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });

//   it("logs in programmatically without using the UI", function () {
//     const username = "ThangNLD";
//     const password = "zaq123";
//     var jwt = "DRACK";

//     cy.request({
//       method: "POST",
//       url: "http://toan0701.ddns.net:9080/Nococid/api/Auth/login",
//       failOnStatusCode: false,
//       auth: {
//         username,
//         password,
//       },
//     }).then((response) => {
//       window.localStorage.setItem("user", username);
//       window.localStorage.setItem("jwt", response.body.jwt);
//       // localStorage.setItem(jwt, response.body.jwt);

//       cy.visit("http://localhost:3000/home");
//       cy.wait(1000);
//       cy.window().then((window) =>
//         console.log(window.localStorage.getItem("user"))
//       );
//       cy.window().then(() => console.log(localStorage.getItem(jwt)));
//       const logout = "Bearer " + response.body.jwt;

//       cy.wait(1000);
//       cy.request({
//         method: "POST",
//         url: "http://toan0701.ddns.net:9080/Nococid/api/Auth/logout",
//         headers: {
//           Authorization: logout,
//         },
//       });
//       cy.clearLocalStorage();
//       cy.visit("http://localhost:3000");
//     });
//   });
// });

describe("Test login 2", () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    // cy.exec("npm run db:reset && npm run db:seed");

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    cy.visit("http://localhost:3000");
    // cy.request("POST", "http:localhost:3000", { username: "ThangNLD" })
    //   .its("body")
    //   .as("currentUser");
  });

  it("logs in programmatically without using the UI", function () {
    // destructuring assignment of the this.currentUser object
    const username = "ThangNLD";
    const password = "zaq@123";
    var jwt = "DRACK";
    // cy.get("Form");
    // cy.get("Form").submit();
    // programmatically log us in without needing the UI
    cy.request("POST", "http://toan0701.ddns.net:9080/Nococid/api/Auth/login", {
      username,
      password,
    }).then((response) => {
      window.localStorage.setItem("user", username);
      window.localStorage.setItem("jwt", response.body.jwt);
      // localStorage.setItem(jwt, response.body.jwt);

      cy.visit("http://localhost:3000/home");
      cy.wait(1000);
      cy.window().then((window) =>
        console.log(window.localStorage.getItem("user"))
      );
      cy.window().then(() => console.log(localStorage.getItem(jwt)));
      const logout = "Bearer " + response.body.jwt;

      cy.wait(1000);
      cy.request({
        method: "POST",
        url: "http://toan0701.ddns.net:9080/Nococid/api/Auth/logout",
        headers: {
          Authorization: logout,
        },
      });
      cy.clearLocalStorage();
      cy.visit("http://localhost:3000");
    });
  });
});
