# Book Catalog

## Live Link
[Book Catalog Live Demo](https://lighthearted-halva-6443ac.netlify.app/)

## Frontend Code
[Frontend GitHub Repository](https://github.com/mohammadShamimReza/book_catalog)

## Backend Code
[Backend GitHub Repository](https://github.com/mohammadShamimReza/book_catalog_server)

## Technology Stack
- TypeScript (Ts)
- React
- Redux Toolkit
- RTK Query
- Custom authentication (node-mongodb)

## Book Catalog System

Welcome to the Book Catalog System repository! This project is a React and Redux-based web application designed to catalog and manage books. It includes features like user authentication, book listing, searching, filtering, adding, editing, and deleting books, as well as leaving book reviews. Additionally, it offers a bonus feature: a wishlist for users to keep track of books they want to read.

## Project Overview

This web application consists of several main pages and features:

### Landing Page
- The landing page provides open routes such as "All Books," "Sign In," and "Sign Up."
- Users can sign in, create new accounts, and securely log out.

### All Books Page
- This page fetches a list of books from an API using Redux Toolkit Query (RTK Query) and displays them in a user-friendly manner.
- Users can search for books based on criteria like title, author, or genre.
- Filtering options are available to narrow down the book list by genre and publication year.
- Authenticated users can add new books to the catalog.

### Add New Book Page
- Authenticated users can add new books to the catalog by filling out a form.
- Notifications are provided to inform users of the success or failure of the operation.

### Book Details Page
- Clicking on a book in the list leads to a detailed view with information like title, author, genre, publication date, and reviews.
- Authenticated users can leave reviews for books.
- Users can edit book details or delete books.

### Edit Books Page
- Authenticated users can edit book details using a form that includes current data.
- Notifications inform users of the outcome of the edit operation.
