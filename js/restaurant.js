// Get restaurant ID from URL


let params = new URLSearchParams(
window.location.search
);


let restaurantID = params.get("id");




// Load JSON


fetch("data/restaurants.json")


.then(response=>response.json())


.then(data=>{


let restaurant = data.find(
item=>item.id === restaurantID
);



if(!restaurant){


document.getElementById(
"restaurantDetail"
).innerHTML =

"<h2>Restaurant not found</h2>";


return;


}



displayRestaurant(restaurant);



});







function displayRestaurant(item){



// Change browser title for SEO


document.title =

item.name +

" | KL Food Guide";





let container =

document.getElementById(
"restaurantDetail"
);





container.innerHTML = `



<div class="card">



<h2>

${item.name}

</h2>





<div class="gallery">


${item.images.map(image=>


`

<img 

src="images/${image}"

alt="${item.name} Kuala Lumpur restaurant">

`


).join("")}


</div>






<h3>
📍 Location
</h3>


<p>

${item.address}

</p>





<h3>
💰 Price
</h3>


<p>

${item.price}

</p>


<h3>
⭐ Honest Rating
</h3>


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


<h3>
🏷 Categories
</h3>


<div>


${item.tags.map(tag=>

`

<span class="tag">

${tag}

</span>

`

).join("")}


</div>






<h3>
🍽 Must Try
</h3>


<ul>

${item.mustTry.map(food=>

`

<li>

${food}

</li>

`

).join("")}


</ul>







<h3>
⭐ Honest Review
</h3>


<p>

${item.review}

</p>






<h3>
👥 Suitable For
</h3>


<p>

${item.suitable}

</p>






<h3>
🕒 Opening Hours
</h3>


<p>

${item.hours}

</p>




</div>





`;



}
