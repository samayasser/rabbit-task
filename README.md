
# Rabbit Coding Challenge

## Business Context

Rabbit operates multiple stores across the region, processing thousands of orders each day across various locations. The company is working to enhance its system to provide a better user experience for customers.

---

## Requirements

### 1. **Top 10 Most Frequently Ordered Products API**

- Develop an API that returns the **top 10 most frequently ordered products** in a specific area. The area can be identified based on the location or region.
- This API will be integrated into a mobile application and displayed on the user’s home screen.
- The API should be designed to handle millions of requests efficiently, as Rabbit’s homepage experiences significant traffic.

### 2. **Optimizing a Poorly Implemented List Products API**

- There is an existing API to list products (/product), but it has **poor performance** due to inefficient database queries and bad code practices. I changed the api to have better performance by using pagination and resticting number of items per page

---

## Technical Requirements

### 1. **Environment Setup**

- Install **Node.js** (version 20 or higher).
- Set up any **SQL database** (such as PostgreSQL or MySQL) to store product and order information.
- Review and understand the dependencies in the provided `package.json`. Identify libraries you may use to improve performance.
- Run `yarn prisma:generate`
- Run `yarn migrate:dev`
- Run `yarn seed`
