//**********************************
// CONSTANTS -----------------------
//**********************************
const toggleMenuBtn = $(".toggle-btn");
const navMenu = $(".nav-menu");
const form = $(".inputbox").submit(function (event) {
  event.preventDefault();
});
const submitBtn = $(".inputbox__bottom--btn");

//**********************************
// INPUT FEILD ---------------------
//**********************************
let pickUpDate = {};
let dropOffDate = {};
let rentTimeRange;
let pickUpLocation = $(".pick-up-location").selectmenu();
let dropOffLocation = $(".drop-off-location").selectmenu();
let partySize = $(".peopleCount").spinner({
  min: 1,
  max: 6,
});
$(".peopleCount").spinner("value", 1);
// CALENDAR -- LIGHT PICKER
// let picker = new Lightpick({
//   field: document.getElementById("datepicker-from"),
//   secondField: document.getElementById("datepicker-to"),
//   repick: true,
//   singleDate: false,
//   startDate: moment().startOf("month").add(7, "day"),
//   endDate: moment().add(14, "day"),
//   minDate: moment().startOf("month").add(0, "day"),
//   maxDays: 15,
//   selectForward: true,
//   onSelect: function (start, end) {
//     let str = "";
//     str += start ? start.format("Do MMMM YYYY") + " to " : "";
//     str += end ? end.format("Do MMMM YYYY") : "...";
//   },
// });

//**********************************
// Events --------------------------
//**********************************

toggleMenuBtn.click(() => {
  navMenu.slideToggle(550, "easeInOutBack");
});

submitBtn.click(() => {
  console.log("pick up from location " + pickUpLocation.val());
  console.log("Drop off at location " + dropOffLocation.val());
  console.log("Party size is of " + partySize.spinner("value") + " people");

  console.log(picker.getStartDate());
  console.log(picker.getStartDate().date());

  pickUpDate = picker.getStartDate();
  dropOffDate = picker.getEndDate();
  rentTimeRange = "Days of rent: " + (dropOffDate.diff(pickUpDate, "days") + 1);

  console.log(rentTimeRange);
});
