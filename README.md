to run:
- npm i (in both frontend and root folder)
- navigate to root folder 
- npm start (starts backend server)
- navigate to frontend folder
- npm start (starts react app)

if products arent appearing in the marketplace and/or user login isnt working

enter these urls into chrome

localhost:5000/api/users/seed
localhost:5000/api/products/seed


PAYPAL INFO TESTER
Email: sb-e9l863983187@personal.example.com
Password: 5B>v%36}

Fixes 
- Fixed styling issues where text would blend in with background
- Fixed "Details" button under order history to be consistent in style with "Edit" button in product list
- Removed Stripe from payment methods
- Removed Sidebar and Searchbar from landing page
- Implemented Contact Us in footer (needs styling fix tho)
- Implemented "Bulk Pricing Discount" could change the logic (how many items you need to buy, how big is the discount etc.) 

Fixes 12/9/2020
- I added the route to become a seller screen and added the form for become a seller.

Patch Notes 12/10/2020 -kevin
- Removed payment method page so it goes straight to place order
- implemented review feature for products
- implemented review feature for seller 
- Fixed up date for "Paid on" and "Delivered on" on order screen
- Edit product title on screen is fixed
- Become A Seller function partially fixed
    - clicking on "Become a Seller!" after filling in the form will now redirect you to the profile page.
    - still need to click on update for it to work.


TODO/Notes
- forgot password
- Add discount amount in cart screen
- allow the seller to choose discount price per units sold
- FAQ page (optional)# BulkUP-Final
