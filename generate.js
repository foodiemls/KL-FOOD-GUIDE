
const fs = require("fs");


// ==========================
// Read files
// ==========================


const restaurants = JSON.parse(

fs.readFileSync(
"data/restaurants.json",
"utf8"
)

);



const template = fs.readFileSync(

"templates/restaurant-template.html",

"utf8"

);





// Create folder if not exist

if(!fs.existsSync("restaurants")){

fs.mkdirSync("restaurants");

}





// ==========================
// Generate pages
// ==========================


restaurants.forEach(function(item){



let html = template;



html = html.replaceAll(
"{{TITLE}}",
`${item.name} | KL Food Guide`
);



html = html.replaceAll(
"{{DESCRIPTION}}",
`Discover ${item.name} in Kuala Lumpur. Find price, reviews, must try food and opening hours.`
);



html = html.replaceAll(
"{{NAME}}",
item.name
);



html = html.replaceAll(
"{{CATEGORY}}",
item.category
);



html = html.replaceAll(
"{{PRICE}}",
item.price
);



html = html.replaceAll(
"{{IMAGE}}",
item.images[0]
);



html = html.replaceAll(
"{{ADDRESS}}",
item.address
);

html = html.replaceAll(
"{{ID}}",
item.id
);


html = html.replaceAll(
"{{RATING}}",
(
(
item.ratings.food +
item.ratings.value +
item.ratings.environment
) / 3
).toFixed(1)
);



// Ratings


html = html.replaceAll(

"{{FOOD}}",

item.ratings.food

);



html = html.replaceAll(

"{{VALUE}}",

item.ratings.value

);



html = html.replaceAll(

"{{ENVIRONMENT}}",

item.ratings.environment

);





// Tags


let tags = item.tags.map(function(tag){

return `

<span class="tag">

${tag}

</span>

`;

}).join("");



html = html.replaceAll(

"{{TAGS}}",

tags

);





// Must Try


let mustTry = item.mustTry.map(function(food){

return `

<li>${food}</li>

`;

}).join("");



html = html.replaceAll(

"{{MUSTTRY}}",

mustTry

);






html = html.replaceAll(

"{{REVIEW}}",

item.review

);





html = html.replaceAll(

"{{SUITABLE}}",

item.suitable

);





html = html.replaceAll(

"{{HOURS}}",

item.hours

);







// Save file


fs.writeFileSync(

`restaurants/${item.id}.html`,

html

);



console.log(

"Generated:",

item.id + ".html"

);



});
