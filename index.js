"use strict"

/* Card JS */
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

let id;
const output = document.getElementById("output");


function getAllGigs() {
  axios.get("http://localhost:8080/getAllGigs/")
    .then(res => {
      output.innerHTML = "";
      const gigs = res.data;

      gigs.forEach(gig => {
        const newGig = renderGig(gig);
        console.log("New Entry: ", newGig);
        output.appendChild(newGig);
      });
    }).catch(err => console.error(err))
}



// print content onto the page with this function
function renderGig(gig) {
  const newLine = document.createElement("div");
  
  newLine.className = "col";

  const newGig = document.createElement("div");
  newGig.className = "card";
  newLine.appendChild(newGig);

  const gigBody = document.createElement("div");
  gigBody.className = "card-body";
  newGig.appendChild(gigBody);

  const gigArtist = document.createElement("h4");
  gigArtist.className = "card-title";
  gigArtist.innerText = gig.artist;
  gigBody.appendChild(gigArtist);

  const restOfGig = document.createElement("p");
  restOfGig.className = "card-text";
  restOfGig.innerHTML = "City: " + gig.city;
  restOfGig.innerHTML += "<br>";
  restOfGig.innerHTML += "Venue: " + gig.venue;
  restOfGig.innerHTML += "<br>";
  restOfGig.innerHTML += "Date: " + gig.gigDate;
  restOfGig.innerHTML += "<br>";
  restOfGig.innerHTML += "Time: " + gig.gigTime + "pm";
  gigBody.appendChild(restOfGig);

  const gigFooter = document.createElement("div");
  gigFooter.className = "card-footer";
  newGig.appendChild(gigFooter);

  const deleteButton = document.createElement("button");
  deleteButton.className = "card-link-delete";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener('click', function () {
    deleteGig(gig.id);
  });
  gigFooter.appendChild(deleteButton);

  const updateButton = document.createElement("button");
  updateButton.className = "card-link";
  updateButton.innerText = "Update";
  updateButton.addEventListener('click', function () {
    id = gig.id;
    myModal.show();
  
  });
  gigFooter.appendChild(updateButton);

  return newLine;


} /* end of render function*/



function deleteGig(id) {
  axios.delete("http://localhost:8080/delete/" + id)
    .then(() => getAllGigs())
    .catch(err => console.error(err));
  
}



document.getElementById("gigEntryForm").addEventListener('submit', function (event) {
  event.preventDefault();


  const data = {
    artist: this.artist.value,
    city: this.city.value,
    venue: this.venue.value,
    gigDate: this.gigDate.value,
    gigTime: this.gigTime.value 
  };

  

  axios.post("http://localhost:8080/createGig", data, {
    headers: {
      "Content-Type": "application/json", // sending JSON
      "Accept": "application/json"
    }
  }).then(() => {
    this.reset();
    this.artist.focus();
    getAllGigs();
  })
    .catch(err => console.error(err));
});




document.getElementById("updateForm").addEventListener('submit', function (event) {
  event.preventDefault();
//overwrite the data so it updates
  const data = {
    artist: this.newArtist.value,
    city: this.newCity.value,
    venue: this.newVenue.value,
    gigDate: this.newGigDate.value,
    gigTime: this.newGigTime.value
  };



  
  axios.put('http://localhost:8080/update/' + id, data, {
    headers: {
      "Content-Type": "application/json", // sending JSON
      "Accept": "application/json"
    }
  })
    .then(response => {
      getAllGigs()
    })
    .catch(err => {
      console.log(err);
    });
})

//end of event listener update 

function updateGig(id, newArtist, newCity, newVenue, newGigDate, newGigTime) {

  const data = {

    artist: newArtist.value,
    city: newCity.value,
    venue: newVenue.value,
    gigDate: newGigDate.value,
    gigTime: newGigTime.value
  }
}



getAllGigs();





