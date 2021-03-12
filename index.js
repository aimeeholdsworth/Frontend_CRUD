"use strict"

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}




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
  restOfGig.innerHTML += "Time: " + gig.gigTime;
  gigBody.appendChild(restOfGig);

  const gigFooter = document.createElement("div");
  gigFooter.className = "card-footer";
  newGig.appendChild(gigFooter);

  const deleteButton = document.createElement("a");
  deleteButton.className = "card-link";
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

  console.log("this: ", this);
  console.log("this.artist:", this.artist);
  console.log("this.city:", this.city);

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