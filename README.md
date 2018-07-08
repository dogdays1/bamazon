# bamazon

Hello,

You will need this GoogleDrive video link:
https://drive.google.com/file/d/1ln6U-n_YvXnxFk6__gpMIvWQzmZfCWIz/view


This module required creating a database in mySQL, and then querying that
database, both as a bamazonCustomer, and as a bamazonManager.

In the case of the CUSTOMER, items for sale are shown, and the customer
chooses the item number and quantity they'd like to purchase.  If the database 
shows sufficient quantity, the sale is completed and a total is shown to the 
customer, and the database is updated to show the new quantity on hand.

If there is insufficient quantity, the customer is advised accordingly, and asked
to choose a different amount.  Although the database is queried, there are no
changes as the sale is denied.

As a MANAGER, the database is queried to show all products, with all pertinent 
data, or to show only items with low inventory (less than 5).  The manager can
also add quantity to inventory, or even add a new product entirely, updating
the database with the new quantity or product (including all pertinent info).

I have created a video showing this node application in progress (link above).  

You will see:

1) the mySQL database at the beginning
2) a bamazonCustomer purchase one item
3) a bamazonCustomer purchase multiple items
4) a bamazonCustomer being denied a sale due to insufficient quantity
5) and the same sale with lower quantity
6) a bamazonManager view the entire database
7) a bamazonManager view low stock items only
8) a bamazonManager increasing inventory quantity for an item
9) a bamazonManager adding an entirely new item to inventory
10) the final shot is the mySQL database refreshed to show changes, before a few
        random database manipulations.

These steps will remain visible on the right side of the video for you to follow along.