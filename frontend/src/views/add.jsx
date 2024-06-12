// import React, { useState } from "react";
// import "./pages.css";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";

// function Add() {
//   const [name, setName] = useState("");
//   const [picture, setPicture] = useState("");
//   const [ingredients, setIngredients] = useState([""]);

//   const handleAddIngredient = (index, event) => {
//     const values = [...ingredients];
//     values[index] = event.target.value;
//     setIngredients(values);
//     // Will create and update the ingredients array with the values from the input fields
//   };

//   const handleAddClick = () => {
//     setIngredients([...ingredients, ""]);
//   };

//   const handleRemoveClick = (index) => {
//     const values = [...ingredients];
//     values.splice(index, 1);
//     setIngredients(values);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // will hold the value of the ingredients array to send to the backend

//     const recipe = {
//       name,
//       picture,
//       ingredients,
//     };

//     try {
//       const response = await fetch("/recipes/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(recipe),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       // Handle success event
//       console.log("Recipe added successfully!");

//       // Clear the form
//       setName("");
//       setPicture("");
//       setIngredients([""]);
//     } catch (error) {
//       console.error("Error adding recipe: ", error);
//     }
//   };

//   return (
//     <>
//       <div className="fullPage">
//         <div>
//           <h1 className="intro">Add your favorite Recipes!</h1>
//         </div>
//         <div className="formContainer">
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="formBasicName">
//                 <Form.Label htmlFor="name">Recipe Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group as={Col} controlId="formBasicPicture">
//                 <Form.Label htmlFor="picture">Picture</Form.Label>
//                 <Form.Control
//                   type="url"
//                   placeholder="Enter picture URL"
//                   value={picture}
//                   onChange={(e) => setPicture(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>
//             <Form.Group className="mb-3" controlId="formBasicIngredients">
//               <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
//               {ingredients.map((ingredient, index) => (
//                 <div key={index}>
//                   <Form.Control
//                     type="text"
//                     value={ingredient}
//                     onChange={(event) => handleAddIngredient(index, event)}
//                   />
//                   <Button onClick={handleAddClick}>+</Button>
//                   {ingredients.length > 1 && (
//                     <Button onClick={() => handleRemoveClick(index)}>-</Button>
//                   )}
//                 </div>
//               ))}
//             </Form.Group>
//             <Form.Group>
//               <Form.Label htmlFor="dateCreated">Creation Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <div className="button-container">
//               <Button
//                 className="submit"
//                 as="input"
//                 type="submit"
//                 value="Add Recipe"
//                 size="lg"
//               />{" "}
//             </div>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Add;
