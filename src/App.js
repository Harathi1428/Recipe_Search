//import {Header,SearchName,RecipeName,Main,RecipeListContainer,RecipeContainer,CoverImage,Ingredients,SeeMore,Name} from "./components/headercomponent";
import { useState,useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
// import Dialog from '@mui/material/Dialog';
// const APP_ID = '3f4de49b';
// const APP_KEY = '11f49b32cebcb293ec14ec59812f6f02';
 const Main=styled.div`
background-color:white;
display:flex;
flex-direction:column;
`;
const Header=styled.header`
height:20%;
background-color:black;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
padding:2px;
box-shadow:0 3px 6px 0 #555;
`;
 const RecipeName=styled.div`
color:white;
display:flex;
align-items:center;
img{
  width:60px;
  height:50px;
}
`;
const SearchName=styled.div`
padding:5px;
background-color:white;
width:50%;
display:flex;
align-items:center;
border-radius:10px;
margin-right:10px;
img{
  width:25px;
  height:25px;
}
input{
  width:60%;
  height:50%;
  display:flex;
  align-items:center;
  border:none;
  outline:none;
  padding-left:180px;
}
@media (max-width: 768px) {
  input {
    padding-left: 10px;
  }
}
`;
const RecipeListContainer=styled.div`
display:flex;
flex-wrap:wrap;
flex-direction:row;
align-items:center;
padding:30px;
justify-content:space-evenly;
`;
const RecipeContainer=styled.div`
display:flex;
width:250px;
flex-direction:column;
padding:2px;
gap:5px;
margin-bottom:20px;
box-shadow:0 3px 10px 0 #aaa;
`;
const CoverImage=styled.img`
height:200px;
`;
 const Name=styled.span`
text-align:center;
font-size:20px;
font-weight:bold;
color:black;
margin:10px;
`;
const Ingredients=styled.span`
font-size:18px;
font-weight:bold;
color:green;
border:1px solid green;
border-radius:4px;
padding:10px 15px;
text-align:center;
margin-bottom:10px;
`;
const SeeMore=styled(Ingredients)`
color:red;
border:1px solid red;
`;
function App() {
const [SearchItem,setSearchItem]=useState("");
const [Recipes,setRecipes]=useState([]);
// const [Show,setShow]=useState(false);
useEffect(()=>{
  fetchRecipe();
},[SearchItem]);

const fetchRecipe=async()=>{
  try{
    // const encodedSearchItem = encodeURIComponent(SearchItem);
   const response=await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchItem}`);
   setRecipes(response.data.meals || []); ;
  //  console.log(response.data.meals);
  }
  catch(error){
    console.log(error);
  }
};

const searchCall=(event)=>{
// clearTimeout(TimeoutId);
// const timeout=setTimeout(()=>console.log("api call"),500);
// setTimeoutId(timeout);
setSearchItem(event.target.value);

};

  return (
     <>
    <Main>
      <Header>
        <RecipeName>
        <img alt ="app logo" src={`../images/food.png`}/>
                <h2>Recipe Finder</h2>
        </RecipeName>
        <SearchName>
        <img  alt="search logo" src={`../images/search.png`}/>
               <input type="text"  onChange={searchCall} value={SearchItem} placeholder="search "></input>
        </SearchName>
      </Header>
      <RecipeListContainer>
      {Recipes.map((recipe) => (
          <RecipeContainer key={recipe.idMeal}>
            <CoverImage src={recipe.strMealThumb} alt={recipe.strMeal} />
            <Name>{recipe.strMeal}</Name>
             {/* <Ingredients onClick={()=>{
              window.open(recipe.strInstructions);
            }
            }>procedure</Ingredients>  */}
            <SeeMore onClick={()=>{
              window.open(recipe.strYoutube);
            }}>Procedure</SeeMore>
          </RecipeContainer>
        ))}
        </RecipeListContainer>    
        </Main>
        </>
  );
}

export default App;
