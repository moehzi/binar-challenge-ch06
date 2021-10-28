const loginPage = (req, res) => {
  res.render("login", {
    message: false,
    layout: false,
  });
};

const loginUser = (req, res) => {
  res.redirect("/dashboard");
};

const dashboardPage = (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main-layout",
    title: "Dashboard",
    page_name: "dashboard",
  });
};
const usersPage = (req, res) => {
  res.render("user", {
    layout: "layouts/main-layout",
    page_name: "users",
  });
};
module.exports = {
  loginPage,
  loginUser,
  dashboardPage,
  usersPage,
};
