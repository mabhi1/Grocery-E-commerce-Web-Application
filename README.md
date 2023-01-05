# Asian Mart - Grocery-E-commerce-Web-Application

This is the final project for CS 554 by the group "Shah & Co."

Group Members: Shrey Shah, Swayam Shah, Abhishek Mishra, Aditya Kotian & Prathamesh Shelar

## Github Link: https://github.com/mabhi1/Grocery-E-commerce-Web-Application

## Hosted Client Link: https://animated-meerkat-2d5d3b.netlify.app/

## Hosted Express Server Link: https://asian-mart-express.onrender.com

## Hosted Apollo Server Link: https://asian-mart-apollo.onrender.com

A. Mandatory Steps:

1. Pull the code from the main branch of the repository.
2. Go to cd server and type "npm i" on the server (which is apollo server) to install dependencies.
3. Go to cd express folder and run "npm i" to install dependencies.
4. Go to client side through cd client and run "npm i --force".
5. Later run "npm start" on the server side which will initiate the apollo server.
6. Run "npm start" on the express side which will kickstart the express server.
7. Run "npm start" on the client side which will kickstart our application. You will be redirected to the "Home Page" or the "Landing Page" of the application.

B. Login Credentials:

## MongoDB Atlas Credentials => username: cs554stevens@gmail.com, password: pass123bruh

## Note: You need to login with gmail

## Admin => username: admin@asianmart.com, password: 123456

## User => username: peterparker@gmail.com, password: 654321

C. The working of our application:

## Note: We hosted our both the servers on Heroku and client side on Netlify.

After logging in, the Landing Page of the application would be displayed. Then there are operations which are common for both the admin and the users/ customers. They are as follows:

1. Cart tab: The admin can view the products that he/she added in the cart. The admin can either change the quantity of the products or can completely remove product(s) from the cart and then proceed to checkout page if there are product(s) in the cart.

2. Account tab: The account tab will first display the profile that comprises of all details such as name, email, phone number and address. The admin can update these details if he/she wishes to edit it. Further this page will display the details of the products that were ordered. The page will also display the reviews the admin posted for the products.

3. Sign Out tab: The admin will sign out of the application.

4. Products tab: The products page will display the products available at our store. If a product is not available then that particular product will be marked as out of stock. You can search for a product either by entering the name of the product or by the category. Also you can sort the products by their price.

Following functions can only be executed by the admin of the application:

- Dashboard tab: On the Dashboard Page the admin can perform following operations:

- Under the Orders section, the admin will see the name of the person along with their address and the products that they have ordered. The admin will also be able to filter orders on the basis of criteria such as ordered, dispatched and completed. Lastly, the admin can also decide the status of a particular order.

- On the Reviews section, the admin would be able to see the reviews that have been reported or flagged by users.The admin can sort the reviews by the number of times a review has been flagged. Additionally, the admin can also delete these flag reviews.

- On the Products section, the admin will see all the products being sold by the store. The admin can search for a product by entering the name of the product. A product can either be deleted or its details can be updated by the admin. Lastly, a new product can also be added by the admin through add product button.

## Note: While checking out, the customer needs to enter his/her card details. Please enter "4242-4242-4242-4242" for testing the payment functionality of our application. Also, specify 04/24 as expiry date and 424 as CVV.
