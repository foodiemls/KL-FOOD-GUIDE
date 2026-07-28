let restaurants = [];


// ==========================
// LOAD RESTAURANT DATA
// ==========================


fetch("./data/restaurants.json")


.then(function(response){


    if(!response.ok){

        throw new Error(
            "Cannot load restaurants.json"
        );

    }


    return response.json();


})


.then(function(data){


console.log("Restaurant data loaded:", data);


restaurants = data;


displayRestaurants(restaurants);


updateCategoryCount();


})


.catch(function(error){


    console.error(
        "Loading error:",
        error
    );


    document.getElementById(
        "restaurantList"
    ).innerHTML = `

    <h2>
    Unable to load restaurant data
    </h2>

    <p>
    Check data/restaurants.json path
    </p>

    `;


});







// ==========================
// DISPLAY CARD
// ==========================


function displayRestaurants(data){


let container =
document.getElementById(
    "restaurantList"
);



container.innerHTML="";



if(data.length===0){


container.innerHTML = `

<h2>
No restaurant found
</h2>

`;

return;


}


data.forEach(function(item){



let image = 
item.images && item.images.length > 0

?
item.images[0]

:
"";



let tags =

item.tags || [];




let card = document.createElement("div");


card.className="card";

card.innerHTML = `


<img

src="images/${image}"

alt="${item.name} Kuala Lumpur food"


onerror="this.style.display='none'"

>



<div class="content">


<h2>

🍽 ${item.name}

</h2>

<p>

📍 ${item.location || item.address}

</p>

<p>

🍴 ${item.category}

</p>

<p>

💰 ${item.price}

</p>

<p>

⭐ Overall:
${(
(
item.ratings.food +
item.ratings.value +
item.ratings.environment
)/3
).toFixed(1)}/10

</p>


<p>

🍽 Food:
${item.ratings.food}/10

<br>

💰 Value:
${item.ratings.value}/10

<br>

🌿 Environment:
${item.ratings.environment}/10

</p>


<div>


${

tags.map(function(tag){

return `

<span class="tag">

${tag}

</span>

`

}).join("")


}


</div>

<br>


<button

class="view"

onclick="openRestaurant('${item.id}')"

>

View Details

</button>



</div>



`;



container.appendChild(card);



});



}


// ==========================
// SEARCH
// ==========================


function searchFood(){


let keyword =

document

.getElementById("searchInput")

.value

.toLowerCase();


let result = restaurants.filter(function(item){



let text = `

${item.name}

${item.location}

${item.address}

${item.category}

${item.tags}

`

.toLowerCase();




return text.includes(keyword);



});



displayRestaurants(result);



}


// ==========================
// CATEGORY FILTER
// ==========================



function filterFood(category){

if(category==="all"){


displayRestaurants(restaurants);

return;

}

let result = restaurants.filter(function(item){


return item.category === category;

});

displayRestaurants(result);

}

function updateCategoryCount(){


let buttons = document.querySelectorAll(".category");


buttons.forEach(function(button){


let category =
button.getAttribute("onclick")
.match(/'([^']+)'/)[1];



if(category === "all"){

button.innerHTML =
"All (" + restaurants.length + ")";

return;

}



let count =
restaurants.filter(function(item){

return item.category === category;

}).length;



let text =
button.innerText.replace(/\s*\(\d+\)/,"");



button.innerHTML =
text + " (" + count + ")";


});


}

// ==========================
// DETAIL PAGE
// ==========================

function openRestaurant(id){

window.location.href =
"/KL-FOOD-GUIDE/restaurants/" + id + ".html";

}
