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
const petrolPerLiter = 2.3;
const tripSummaryRetractButton = $(".tripSummaryContainer__button");
let buttonPointer;

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
let distanceOfTravelContainer = summativeParentNode.find(".distanceOfTravel");
let distanceInKm = 100;
let newVehicleArray = [];
//**********************************
// INPUT FEILD ---------------------
//**********************************
let pickUpDate = {};
let dropOffDate = {};
let rentTimeRange = 1;
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
                  <li>FCE: $${fuelPerDistanceCost(
                    vehicleObject.fuelPer100km
                  )}</li>

                </ul>
                <div class="vehicleResult__info--iconList">
                  <div>
                    <i class="fas fa-users"></i>
                    <h3>${vehicleObject.carrySize}</h3>
                  </div>
                  <div>
                    <i class="fas fa-suitcase-rolling"></i>
                    <h3>${vehicleObject.smallLuggage}</h3>
                  </div>
                  <div>
                    <i class="fas fa-suitcase"></i>
                    <h3>${vehicleObject.largeLuggage}</h3>
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
  return rentTimeRange * priceInput;
};

let distanceCalculation = (x, y) => {
  console.log(x, y);
  if (x > y) {
    console.log("x is greater then");
    return x - y;
  }
  console.log("x is less then");
  return y - x;
};

let fuelPerDistanceCost = (fuelPer100km) => {
  if (fuelPer100km * (distanceInKm / 100).toFixed(1) === 0) {
    return parseInt(petrolPerLiter * fuelPer100km);
  }
  return parseInt(petrolPerLiter * (fuelPer100km * (distanceInKm / 100)));
};

//**********************************
// FILTER --------------------------
//**********************************
let filterThroughVehicleArray = () => {
  newVehicleArray = vehicleArray.filter((e) => {
    return (
      e.carrySizeMin <= partySizeNumberCount &&
      e.carrySizeMax >= partySizeNumberCount &&
      e.minDay <= rentTimeRange &&
      e.maxDay >= rentTimeRange
    );
  });
  console.log(newVehicleArray);
  generateVehicleOptions(newVehicleArray);
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
  if (newPickUpLocation === "Pick Up Location") {
    newPickUpLocation = "Please Pick A Location";
  }
  pickUpLocationContainer.html(newPickUpLocation);
};
let updateDropOffLocation = (newDropOffLocation) => {
  if (newDropOffLocation === "Drop Off Location") {
    newDropOffLocation = "Please Pick A Location";
  }
  dropOffLocationCOntainer.html(newDropOffLocation);
};
let loadInSummaryPointerButton = () => {
  $(".rental-page__layout").append(
    `<div class="buttonPointer"><i class="fas fa-car"></i></div>`
  );
  buttonPointer = $(".buttonPointer");
  buttonPointer.click(() => {
    $(".rental-page__layout--trip-summary").toggle(
      "slide",
      { direction: "right" },
      200
    );
  });
};

//**********************************
// Events --------------------------
//**********************************
toggleMenuBtn.click(() => {
  navMenu.slideToggle(550, "easeInOutBack");
});

let showTripSummary = () => {
  if (window.innerWidth > 870) {
    $(".rental-page__layout--trip-summary").show();
  }
};

tripSummaryRetractButton.click(() => {
  console.log("button hit");
  $(".rental-page__layout--trip-summary").hide(
    "slide",
    { direction: "right" },
    200
  );
});

submitBtn.click(() => {
  //pick up drop off date
  pickUpDate = picker.getStartDate();
  dropOffDate = picker.getEndDate();

  //Form Get
  let pickUpLocation = form.find(".pick-up-location option:selected");
  let dropOffLocation = form.find(".drop-off-location option:selected");

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
  //Distance Calculation
  distanceInKm = distanceCalculation(
    parseInt(pickUpLocation.val()),
    parseInt(dropOffLocation.val())
  );
  distanceOfTravelContainer.html(distanceInKm + " Km");

  loadInSummaryPointerButton();

  //Filter
  filterThroughVehicleArray();

  //show summary chart
  showTripSummary();
});

init();
