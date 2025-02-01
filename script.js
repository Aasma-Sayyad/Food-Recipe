const searchBox=document.querySelector(".searchBox");
const searchBtn=document.querySelector(".searchBtn");
const recipeContainer=document.querySelector(".recipe-container");
const recipeCloseBtn=document.querySelector(".recipe-close-btn");
const recipeDetailsContent=document.querySelector(".recipe-details-content");


// function fetch receipe
const fetchReceipe= async(query)=>{
    
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json();
    // console.log(response.meals[0]);

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        console.log(meal[0]);

        const recipDiv=document.createElement('div');
        recipDiv.classList.add('recipe');
        recipDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span></p>
            <p><span>${meal.strCategory}</span></p>
        
        `
        const button =document.createElement('button');
        button.textContent="View Recipe";
        recipDiv.appendChild(button);

         //Adding EventListner to recipe button
         button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })

       

        recipeContainer.appendChild(recipDiv);
    });
    

}

const openRecipePopup= (meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2>${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        
        <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>

    
    ` 
    console.log(meal.strInstructions);
    recipeDetailsContent.parentElement.style.display='block';
}
// fuction to fetch ingredients and measurment
const fetchIngredients = (meal)=>{

    let ingrediantsList="";
    for(let i=1;i<=20;i++){
        const ingrediant=meal[`strIngredient${i}`];
        if(ingrediant){
            const measure=meal[`strMeasure${i}`];
            ingrediantsList+=`<li>${measure} ${ingrediant}</li>`
        }
        else{
            break;
        }
    }
    return ingrediantsList;
}

// recipe close button eventlistener
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display='none';
})


//search recipe  button eventlistener
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchReceipe(searchInput);

});