<template>
    <div class="not-found">
      <div class="container">
        <img src="../assets/404.svg" alt="404 Not Found" class="not-found-image" />
        <h1 class="not-found-title">Oops! Page Not Found</h1>
        <p class="not-found-message">
          Sorry, the page you are looking for does not exist. It might have been removed or you might have entered an incorrect URL.
        </p>
        <router-link to="/" class="not-found-button">Go to Homepage</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PageNotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
    text-align: center;
  }
  
  .container {
    max-width: 600px;
    padding: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .not-found-image {
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
  }
  
  .not-found-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  .not-found-message {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
  }
  
  .not-found-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .not-found-button:hover {
    background-color: #0056b3;
  }
  </style>
  