const fs = require("fs");


// Load restaurant data

const restaurants = JSON.parse(

fs.readFileSync(
"data/restaurants.json",
"utf8"
)

);



const baseURL =
"https://foodiemls.github.io/KL-FOOD-GUIDE/";





let sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

`;




// Homepage

sitemap += `

<url>

<loc>
${baseURL}
</loc>

<changefreq>
weekly
</changefreq>

<priority>
1.0
</priority>

</url>

`;






// Restaurant pages


restaurants.forEach(function(item){


sitemap += `

<url>

<loc>
${baseURL}restaurants/${item.id}.html
</loc>


<changefreq>
monthly
</changefreq>


<priority>
0.8
</priority>


</url>

`;



});






sitemap += `

</urlset>

`;







fs.writeFileSync(

"sitemap.xml",

sitemap

);



console.log(
" sitemap.xml generated successfully"
);
