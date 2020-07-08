const toggleMenuBtn = $(".toggle-btn");
const navMenu = $(".nav-menu");

toggleMenuBtn.click(() => {
  navMenu.slideToggle(550, "easeInOutBack");
});

$("document").ready(() => {
  let dateFormat = "dd/mm/yy";

  $(() => {
    let form = $(".from").datepicker({
      firstDay: 1,
      minDate: 0,
      changeMonth: true,
      constrainInput: true,
      showButtonPanel: true,
      currentText: "Today",
      closeText: "Close",
    });
  });
});
