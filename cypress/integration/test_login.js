// cy.visit("/login", {
//   auth: {
//     username: "ThangNLD",
//     password: "zaq@123",
//   },
// });

//http://toan0701.ddns.net:9080/Nococid/api/Auth/login

// describe("My First Test", () => {
//   it("Thang Test", () => {
//     cy.visit("http://localhost:3000", {
//       auth: {
//         username: "ThangNLD",
//         password: "zaq@123",
//       },
//     });
//   });
// });

describe("Test login 1", () => {
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
    var token = "";

    // programmatically log us in without needing the UI
    cy.request("POST", "http://toan0701.ddns.net:9080/Nococid/api/Auth/login", {
      username,
      password,
    }).then((response) => {
      window.localStorage.setItem("user", username);
      //   expect(response.body).to.have.property("jwt");
      window.localStorage.setItem("jwt", response.body.jwt);
      localStorage.setItem(jwt, response.body.jwt);
      token = response.body.jwt;
    });

    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit("http://localhost:3000/home");
    cy.wait(1000);
    cy.window().then((window) =>
      console.log(window.localStorage.getItem("user"))
    );
    cy.window().then((window) => console.log(window.localStorage.getItem(jwt)));
    cy.window().then((window) =>
      console.log(window.localStorage.getItem("jwt"))
    );
    const logout = "Bearer " + window.localStorage.getItem("jwt");

    cy.wait(1000);
    cy.request({
      method: "POST",
      url: "http://toan0701.ddns.net:9080/Nococid/api/Auth/logout",
      headers: {
        Authorization: logout,
      },
    });

    // our auth cookie should be present
    //   cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    //cy.get("h1").should("contain", "ThangNLD");
  });
});

// describe("Test login 2", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });

//   it("logs in programmatically without using the UI", function () {
//     const username = "ThangNLD";
//     const password = "123";

//     cy.request("POST", "http://toan0701.ddns.net:9080/Nococid/api/Auth/login", {
//       username,
//       password,
//     }).then((resp) => {
//       window.localStorage.setItem("user", username);
//     });

//     cy.visit("http://localhost:3000/home");
//     cy.wait(1000);
//     cy.window().then((window) =>
//       console.log(window.localStorage.getItem("user"))
//     );
//   });
// });
