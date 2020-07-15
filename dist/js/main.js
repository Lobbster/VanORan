//**********************************
// CONSTANTS -----------------------
//**********************************
const toggleMenuBtn = $(".toggle-btn");
const navMenu = $(".nav-menu");
const form = $(".inputbox").submit(function (event) {
  event.preventDefault();
});
const submitBtn = $(".inputbox__bottom--btn");
const summativeParentNode = $(".tripSummaryContainer");
const resultBox = $(".resultBox");

let vehicleArray = [];
let daysRentingContainer = summativeParentNode.find(".daysRentingContainer");
let partySizeContainer = summativeParentNode.find(".partySizeContainer");
let pickUpDateContainer = summativeParentNode.find(".pickUpDateContainer");
let dropOffDateCOntainer = summativeParentNode.find(".dropOffDateCOntainer");
let pickUpLocationContainer = summativeParentNode.find(
  ".pickUpLocationContainer"
);
let dropOffLocationCOntainer = summativeParentNode.find(
  ".dropOffLocationContainer"
);

//**********************************
// INPUT FEILD ---------------------
//**********************************
let pickUpDate = {};
let dropOffDate = {};
let rentTimeRange;
let partySize = form.find(".partySize");
let partySizeNumberCount = 1;
let pickUpLocation;
let dropOffLocation;

//**********************************
// CALENDAR LIGHT PICKER -----------
//**********************************
let picker = new Lightpick({
  field: document.getElementById("datepicker-from"),
  secondField: document.getElementById("datepicker-to"),
  repick: true,
  singleDate: false,
  maxDays: 15,
  selectForward: true,
  onSelect: function (start, end) {
    let str = "";
    str += start ? start.format("Do MMMM YYYY") + " to " : "";
    str += end ? end.format("Do MMMM YYYY") : "...";
  },
});

//**********************************
// INITALISE -----------------------
//**********************************
let init = () => {
  $.getJSON("/dist/json/vehicles.json", (data) => {
    vehicleArray = data.vehicles;
    generateVehicleOptions(vehicleArray);
  });
};

//**********************************
// GENERATE OPTIONS ----------------
//**********************************
let generateVehicleOptions = (arrayInput) => {
  let html = "";
  for (i = 0; i < arrayInput.length; i++) {
    html += makeVehicleOptionsd(arrayInput[i]);
  }
  resultBox.html(html);
};

let makeVehicleOptionsd = (vehicleObject) => {
  return `
  <div class="vehicleResult">
              <div class="vehicleResult__id">
                <img
                  src="${vehicleObject.image}"
                  class="vehicleResult__id--image"
                  alt=""
                />
                <h3 class="vehicleResult__id--name">${vehicleObject.name}</h3>
              </div>
              <div class="vehicleResult__info">
                <ul class="vehicleResult__info--list">
                  <li>Min Days ${vehicleObject.minDay}</li>
                  <li>Max Days ${vehicleObject.maxDay}</li>
                  <li>Fuel ${vehicleObject.fuelPer100km}L/100km</li>
                </ul>
                <div class="vehicleResult__info--iconList">
                  <div>
                    <i class="fas fa-users"></i>
                    <h3>${vehicleObject.carrySize}</h3>
                  </div>
                  <div>
                    <i class="fas fa-suitcase-rolling"></i>
                    <h3>4</h3>
                  </div>
                  <div>
                    <i class="fas fa-suitcase"></i>
                    <h3>6</h3>
                  </div>
                </div>
              </div>
              <div class="vehicleResult__order">
                <div class="vehicleResult__order--price">
                  <h3>NZD: $${calculatePriceBasedOnDays(
                    vehicleObject.price
                  )}</h3>
                  <h5>$${vehicleObject.price}/Day</h5>
                  <button class="letsGoButton">
                    Lets Go
                  </button>
                </div>
                <div class="vehicleResult__order--details">
                  <a href="#">
                    <p class="vehicleResult__order--moreInfo">
                      Get more details <i class="fas fa-external-link-alt"></i>
                    </p>
                  </a>
                </div>
              </div>
            </div>
  `;
};

//**********************************
// CALCULATE -----------------------
//**********************************
let calculatePriceBasedOnDays = (priceInput) => {
  return partySizeNumberCount * priceInput;
};

//**********************************
// TRIP SUMMARY --------------------
//**********************************
let updateDaysRenting = (daysRenting) => {
  daysRentingContainer.html("Days: " + daysRenting);
};
let updatePartySize = (partySizeNumberCount) => {
  partySizeContainer.html("People: " + partySizeNumberCount);
};
let updatePickUpDate = (newPickUpDate) => {
  pickUpDateContainer.html(newPickUpDate);
};
let updateDropOffDate = (newDropOffDate) => {
  dropOffDateCOntainer.html(newDropOffDate);
};
let updatePickUpLocation = (newPickUpLocation) => {
  pickUpLocationContainer.html(newPickUpLocation);
};
let updateDropOffLocation = (newDropOffLocation) => {
  dropOffLocationCOntainer.html(newDropOffLocation);
};

//**********************************
// Events --------------------------
//**********************************
toggleMenuBtn.click(() => {
  navMenu.slideToggle(550, "easeInOutBack");
});

let showTripSummary = () => {
  $(".rental-page__layout--trip-summary").show();
};

submitBtn.click(() => {
  //pick up drop off date
  pickUpDate = picker.getStartDate();
  dropOffDate = picker.getEndDate();

  //Form Get
  let pickUpLocation = form.find(".pick-up-location option:selected");
  let dropOffLocation = form.find(".drop-off-location option:selected");

  console.log(dropOffDate.format("DD/MM/YYYY"));
  //Rent Time range
  rentTimeRange = dropOffDate.diff(pickUpDate, "days") + 1;

  //Days Renting
  updateDaysRenting(rentTimeRange);
  //Party Size
  partySizeNumberCount = partySize.val();
  updatePartySize(partySizeNumberCount);
  //Pick Up Date
  updatePickUpDate(pickUpDate.format("DD/MM/YY"));
  //Drop Off Date
  updateDropOffDate(dropOffDate.format("DD/MM/YY"));
  //Pick Up Location
  updatePickUpLocation(pickUpLocation.text());
  //Drop Off Location
  updateDropOffLocation(dropOffLocation.text());
  //show summary chart
  showTripSummary();
});

init();
