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
let pickUpdate = {};
let pickUpLocation = $(".pick-up-location").selectmenu();
let dropOffLocation = $(".drop-off-location").selectmenu();
let partySize = $(".peopleCount").spinner({
  min: 1,
  max: 6,
});
$(".peopleCount").spinner("value", 1);
// CALENDAR -- LIGHT PICKER
let picker = new Lightpick({
  field: document.getElementById("datepicker-from"),
  secondField: document.getElementById("datepicker-to"),
  singleDate: false,
  minDate: moment().startOf("month").add(0, "day"),
  maxDays: 15,
  selectForward: true,
  onSelect: function (start, end) {
    let str = "";
    str += start ? start.format("Do MMMM YYYY") + " to " : "";
    str += end ? end.format("Do MMMM YYYY") : "...";
  },
});

//**********************************
// Events --------------------------
//**********************************

toggleMenuBtn.click(() => {
  navMenu.slideToggle(550, "easeInOutBack");
});

submitBtn.click(() => {
  console.log("pick up from location " + pickUpLocation.val());
  console.log("Drop off at location " + dropOffLocation.val());
  console.log("Party size is" + partySize.spinner("value"));

  console.log(picker.getDate());

  // pickUpDate = picker.getStartDate();
  // dropOffDate = picker.getEndDate();
  // console.log("pick up date " + pickUpDate);
  // console.log("drop off date " + dropOffDate);
});
