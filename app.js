// IIFE immadietely involed function Expression
(async function(){
   const response = await fetch ("./recipes.json");
   const recipes = await response.json();
  // console.log(recipes);

  const inputEle = document.getElementById("searchInput");
  const btnEle = document.getElementById("searchBtn");
  const listEle = document.getElementById("recipe-list");
  const detailsEle = document.getElementById("recipeDetailsContainer");

  function loadRecipeDetails(recipe){
    //console.log(recipe);
        detailsEle.innerHTML = `
        <h2>${recipe.title}</h2>
        <h3>ingredients:</h3>
        <ul> ${recipe.ingredients.map(function(ingredient){
          return "<li>"+ingredient+"</li>"
        }).join("")} </ul> 
        <h3>instruction:</h3>
        <div>${recipe.instructions}</div>
        `;
 
  }
  function displaySearchResult(result){
       listEle.innerHTML="";
        result.forEach(function(recipe){
         // console.log(recipe);
        const li = document.createElement("li");
        const listItem = `
        <div class ="title">${recipe.title}</div>
        <div class ="description"> ${recipe.description} </div>
        `;
        li.innerHTML= listItem;
        li.addEventListener("click",function(){
          loadRecipeDetails(recipe);
        });

        listEle.appendChild(li);
        })
  }
  function search(){
    const qeury = inputEle.value.toLowerCase();
    //console.log(qeury);
    const result = recipes.filter(function(recipe){
        return (recipe.title.toLowerCase().includes(qeury) || 
        recipe.ingredients.join(" ").toLowerCase().includes(qeury))
    }) 
   // console.log(result);
   displaySearchResult(result);
  }
  btnEle.addEventListener("click",search);
})();