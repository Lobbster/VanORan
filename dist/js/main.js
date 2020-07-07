const toggleMenuBtn = $(".toggle-btn");
const navMenu = $(".nav-menu");

toggleMenuBtn.click(() => {
  navMenu.slideToggle(550, "easeInOutBack");
});
