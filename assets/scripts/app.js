// Declaring Variable For Tabs
const oneWayInput = document.getElementById('oneWay');
const returnInput = document.getElementById('return');

//Declaring Variable For Form Element 
const submitBtn = document.getElementById('fetch');
const formDetail = document.querySelector('form');
const departurePlace = document.getElementById("departurePlace");
const departureDate = document.getElementById("departureDate");
const arrivalPlace = document.getElementById("arrivalPlace");
const returnDate = document.getElementById("returnDate");

const elementStatud = document.querySelector('.card_status');

// Declaring Variable For Range Slider
const rangeInput = document.querySelector('.rangeInput');
const rangeValue = document.querySelector('.rangeValue');
const goBtn = document.querySelector('.goBtn');


// Declaring Variable For DOM Element
const displayFlight = document.querySelector('.displayFlight');
const wrapper = document.querySelector('.wrapper');
const ham = document.querySelector('.ham');
const navLink = document.querySelector('.nav-links')
let Data;
const url = "../../data.json";
let flights;



window.onload = () => {
    if (oneWayInput.checked) {
        returnDate.disabled = true;
    }
}

// adding event listeners to tab
oneWayInput.addEventListener('click', () => {
    returnDate.disabled = true;
    clear();
})
returnInput.addEventListener('click', () => {
    returnDate.disabled = false;
    clear();
})


// adding event listeners to rangeSlider
rangeInput.addEventListener('input', () => {
    rangeValue.innerText = rangeInput.value;
})


// adding event listner for Navbar
ham.addEventListener('click', () => {

    if (navLink.style.display === "none") {
        navLink.style.display = "grid";


    }
    else {
       navLink.style.display = "none";
    }
})

// adding event listner to for priceSlider

goBtn.addEventListener('click', () => {

    let newFlight = flights.filter((flight) => {
        if (parseInt(flight.price) <= parseInt(rangeInput.value)) {
            return flight;
            console.log(flight);
        }
    })

    display(newFlight);
})






// submit Button Event Listener

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("button being clicked");
    onSubmit();
    // validate();




})



// funtion to validate inputs of form validate()
const validate = (departure_place, departure_date, arrival_place, return_date) => {

    console.log("inside validated");
    if (departure_place == "Choose Departure") {
        departurePlace.style.boxShadow = "0 0 6px 2px red"
        document.querySelector('.error-departure-place').innerText = " *Departure Place can't be empty";
        return;

    }
    else if (arrival_place == "Choose Arrival") {
        arrivalPlace.style.boxShadow = "0 0 6px 2px red"
        document.querySelector('.error-arrival-place').innerText = " *Arrival Place can't be empty";
        return;

    }
    else if (departure_date == "Departure Date") {
        departureDate.style.boxShadow = "0 0 6px 2px red"
        document.querySelector('.error-departure-date').innerText = " *Departure Date can't be empty";
        return;
    }
    else if (arrival_place == departure_place) {
        departurePlace.style.boxShadow = "0 0 6px 2px red"
        document.querySelector('.error-departure-place').innerText = " *Departure Place and Arrival Place can't be same";
        return;
    }
    else if (returnInput.checked) {
        if (return_date == "Return Date") {
            returnDate.style.boxShadow = "0 0 6px 2px red"
            document.querySelector('.error-return-date').innerText = " *return Date can't be empty";
            return;
        }
    }

    console.log("hello world inside sumbit");

    fetchData(url).then(data => {

        console.log(data);
        search(data, departure_place, departure_date, arrival_place, return_date);
    })

}














// funtion to clear form inputs  clear()
const clear = () => {
    departurePlace.selectedIndex = 0;
    arrivalPlace.selectedIndex = 0;
    departureDate.selectedIndex = 0;
    returnDate.selectedIndex = 0;

  



}

// function to Submit form onSubmit()

const onSubmit = () => {

    console.log("inside submit");
    let departure_place = departurePlace.options[departurePlace.selectedIndex].text;
    let departure_date = departureDate.options[departureDate.selectedIndex].text;
    let arrival_place = arrivalPlace.options[arrivalPlace.selectedIndex].text;
    let return_date = returnDate.options[returnDate.selectedIndex].text;
    validate(departure_place, departure_date, arrival_place, return_date);
}




// funtion to fetch data from json fetchData
const fetchData = async (url) => {

    try {
        const response = await fetch(url);
        const result = await response.json();
        Data = result.data;
        return Data;

    }
    catch (error) {
        console.error(error);
    }



}

// funtion to perform search query

const search = (Data, departure_place, departure_date, arrival_place, return_date) => {

    console.log("inside search", Data);
    flights = Data.filter((flight) => {

        if (flight.departurePlace === departure_place && flight.arrivalPlace == arrival_place && departure_date == flight.date) {
            console.log("search",);
            return flight;
        }
        else if (returnInput.checked) {

            if (flight.departurePlace === arrival_place && flight.arrivalPlace == departure_place && return_date == flight.date) {
                flight.trip = "return";
                return flight
            }
        }
        else {
            return null;
        }


    })

    console.log("flights", flights);

    display(flights);
}



// funtion to display flight data in DOM display()

const display = (flights) => {



    departurePlace.style.boxShadow = "0 0 0 0 transparent";
    arrivalPlace.style.boxShadow = "0 0 0 0 transparent";
    departureDate.style.boxShadow = " 0 0 0 0 transparent";
    returnDate.style.boxShadow = "0 0 0 0 transparent";




    let result = `
    <div class="spinner">

        <div class="roll"></div>

    </div>
`;
    displayFlight.innerHTML = result;

    setTimeout(() => {

        if (flights.length > 0) {
            result = "";
            flights.forEach((flight) => {

                if (flight.trip == "return") {
                    result += `<div class="card">
                    <div class="card_status"> <p>return</p></div>
                <div class="logo_container">
                    <img src=${flight.imgUrl} class="flight_logo">
                </div>
                <p>Flight Name : ${flight.ID}</p>
                <p>Price :&#8377; ${flight.price}</p>
                <div class="card_details">
                    <div>
                        <p><i class="fas fa-map-marker-alt"></i> ${flight.departurePlace}</p>
                        <p><i class="fas fa-calendar-alt"></i> ${flight.date}</p>
                        <p><i class="fas fa-clock"></i> ${flight.departureTime}</p>
                    </div>
                    <div>
                        <p><i class="fas fa-map-marker-alt"></i>  ${flight.arrivalPlace}</p>
                        <p><i class="fas fa-calendar-alt"></i> ${flight.date}</p>
                        <p><i class="fas fa-clock"></i> ${flight.arrivalTime}</p>
                    </div>
                </div>
                <div>
                    <button>Book <i class="fas fa-plane-departure"></i></button>
                </div>
    
        </div>
                `;

                }
                else {
                    result += `<div class="card">
                    
                <div class="logo_container">
                    <img src=${flight.imgUrl} class="flight_logo">
                </div>
                <p>Flight Name : ${flight.flightID}</p>
                <p>Price : &#8377; ${flight.price}</p>
                <div class="card_details">
                    <div>
                        <p><i class="fas fa-map-marker-alt"></i> ${flight.departurePlace}</p>
                        <p><i class="fas fa-calendar-alt"></i> ${flight.date}</p>
                        <p><i class="fas fa-clock"></i> ${flight.departureTime}</p>
                    </div>
                    <div>
                        <p><i class="fas fa-map-marker-alt"></i>  ${flight.arrivalPlace}</p>
                        <p><i class="fas fa-calendar-alt"></i> ${flight.date}</p>
                        <p><i class="fas fa-clock"></i> ${flight.arrivalTime}</p>
                    </div>
                </div>
                <div>
                    <button>Book <i class="fas fa-plane-departure"></i></button>
                </div>
    
        </div>
                `;
                }


            })
            wrapper.style.display = "block";
        }
        else {
            result = ` <div class="no_result">
            <h3>No Flight Available. Try Again After Sometime</h3>
            <img src="../../assets/images/no_result_found.svg" alt="">
        </div>`;
            wrapper.style.display = "none";
        }

        displayFlight.innerHTML = result;
        displayFlight.scrollIntoView({ behavior: "smooth" });


    }, 1500)


}