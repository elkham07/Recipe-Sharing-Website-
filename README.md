#  Recipe Sharing App

A full-stack web application for sharing culinary recipes, featuring external API integration and a secure authentication system.

## Live Demo
**Project URL:** [https://recipe-sharing-website-rcic.onrender.com/]

---

##  Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs (password hashing)
* **External API:** TheMealDB (used for "Recipe of the Day" generation)
* **Deployment:** Render

---

##  Implemented Requirements

1.  **CRUD Operations:** Full cycle of creating, reading, updating, and deleting recipes.
2.  **Authentication:** User registration and login with route protection via JWT Middleware.
3.  **External API:** Integration with TheMealDB using `axios` to fetch random global recipes.
4.  **Frontend:** Interactive user interface built with Vanilla JavaScript and CSS.
5.  **Environment Variables:** Used `.env` to protect sensitive data (Port, MongoDB URI, JWT Secret).
6.  **Deployment:** The project is fully deployed and accessible online.

---

##  API Endpoints

### Auth
* `POST /api/auth/register` — Register a new user.
* `POST /api/auth/login` — Login and receive a JWT token.

### Recipes
* `GET /api/recipes` — Get all user recipes (Authorized only).
* `POST /api/recipes` — Add a new recipe.
* `PUT /api/recipes/:id` — Edit an existing recipe.
* `DELETE /api/recipes/:id` — Delete a recipe.
* `GET /api/recipes/random` — Fetch a random recipe from the external API.

---
