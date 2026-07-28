let restaurants = [];

let currentCategory = "all";


// =====================
// LOAD DATA
// =====================


fetch("data/restaurants.json")

.then(response => response.json())

.then(data => {

restaurants = data;

displayRestaurants(restaurants);

})

.catch(error => {

console.log("Error loading restaurant data:", error);

});





// =====================
// DISPLAY RESTAURANTS
// =====================


function displayRestaurants(data){


let container =
document.getElementById("restaurantList");



container.innerHTML="";



data.forEach(function(item){



let card = document.createElement("div");


card.className="card";



card.setAttribute(
"data-category",
item.category
);





card.innerHTML = `


<img 

src="images/${item.images[0]}"

alt="${item.name} Kuala Lumpur food">


<div class="content">


<h2>

${item.name}

</h2>



<p>

📍 ${item.location}

</p>



<p>

💰 ${item.price}

</p>



<p>

⭐ Rating: ${item.rating}/10

</p>




<div>


${item.tags.map(tag =>

`
<span class="tag">

${tag}

</span>

`

).join("")}


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







// =====================
// SEARCH
// =====================


function searchFood(){


let keyword =

document

.getElementById("searchInput")

.value

.toLowerCase();



let result = restaurants.filter(function(item){



return (

item.name.toLowerCase()
.includes(keyword)

||

item.location.toLowerCase()
.includes(keyword)

||

item.category.toLowerCase()
.includes(keyword)

||

item.tags.join(" ")
.toLowerCase()
.includes(keyword)

);



});



displayRestaurants(result);



}






// =====================
// CATEGORY FILTER
// =====================



function filterFood(category){



currentCategory = category;



if(category==="all"){


displayRestaurants(restaurants);


return;


}




let result = restaurants.filter(function(item){



return item.category === category;



});



displayRestaurants(result);



}





// =====================
// OPEN DETAIL PAGE
// =====================


function openRestaurant(id){



window.location.href =

"restaurant.html?id=" + id;



}
