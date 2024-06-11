// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./pages.css";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import { useNavigate } from "react-router-dom";

// function RecipeBook() {
//   const [recipes, setRecipes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/recipes")
//       .then((response) => {
//         setRecipes(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   return (
//     <>
//       <div className="fullPage">
//         <div>
//           <h1 className="intro">Turn the pages of your Recipe Book!</h1>
//         </div>

//         <div className="recipeContainer">
//           <Row xs={1} md={2} className="g-4">
//             {recipes.map((recipe, idx) => (
//               <Col key={idx}>
//                 <Card style={{ width: "20rem" }}>
//                   <Card.Img
//                     variant="top"
//                     src={
//                       recipe.picture || "https://via.placeholder.com/150x122"
//                     }
//                   />
//                   <Card.Body>
//                     <Card.Title>{recipe.name}</Card.Title>
//                     <Button
//                       variant="primary"
//                       onClick={() => navigate(`/recipes/${recipe.id}`)}
//                     >
//                       View Recipe
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// }

// export default RecipeBook;
