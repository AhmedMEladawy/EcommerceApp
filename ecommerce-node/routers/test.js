// const express = require("express");
// const Cart = require("../models/cart");
// const Item = require("../models/item");
// const Auth = require("../middleware/auth");

// const router = new express.Router();

// // // Get Cart
// router.get("/cart", Auth, async (req, res) => {
//   const owner = req.user._id;
//   try {
//     const cart = await Cart.findOne({ owner });
//     if (cart && cart.items.length > 0) {
//       res.status(200).send(cart);
//     } else {
//       res.send(null);
//     }
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// // // Create Cart
// // router.post("/cart", Auth, async (req, res) => {
// //   const owner = req.user.id;
// //   const { itemId, quantity } = req.body;
// //   try {
// //     const cart = await Cart.findOne({ owner });
// //     const item = await Item.findOne({ _id: itemId });
// //     if (!item) {
// //       res.status(404).send({ message: "Item not found" });
// //       return;
// //     }
// //     const price = item.price;
// //     const name = item.name;

// //     // If a Cart already exists for user

// //     if (cart) {
// //       const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

// //       // Check if product exists or not

// //       if (itemIndex > -1) {
// //         let product = cart.items[itemIndex];
// //         product.quantity += quantity;
// //         cart.bill = cart.items.reduce((acc, curr) => {
// //           return acc + curr.quantity * curr.price;
// //         }, 0);
// //         cart.items[itemIndex] = product;
// //         await cart.save();
// //         res.status(200).send(cart);
// //       }
// //     } else {
// //       // No cart exists, create one

// //       const newCart = await Cart.create({
// //         owner,
// //         items: [{ itemId, name, quantity, price }],
// //         bill: quantity * price,
// //       });
// //       return res.status(201).send(newCart);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send("Something went wrong");
// //   }
// // });

// // // Delete Items in cart
// // router.delete("/cart/", Auth, async (req, res) => {
// //   const owner = req.user._id;
// //   const itemId = req.query.itemId;
// //   try {
// //     let cart = await Cart.findOne({ owner });
// //     const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
// //     if (itemIndex > -1) {
// //       let item = cart.items[itemIndex];
// //       cart.bill -= item.quantity * item.price;
// //       if (cart.bill < 0) {
// //         cart.bill = 0;
// //       }
// //       cart.items.splice(itemIndex, 1);
// //       cart.bill = cart.items.reduce((acc, curr) => {
// //         return acc + curr.quantity * curr.price;
// //       }, 0);
// //       cart = await cart.save();
// //       res.status(200).send(cart);
// //     } else {
// //       res.status(404).send("Item not found");
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(400).send();
// //   }
// // });

// router.delete("/cart/", Auth, async (req, res) => {
//   const owner = req.user._id;
//   const itemId = req.query.itemId;

//   try {
//     let cart = await Cart.findOne({ owner });

//     if (!cart) {
//       return res.status(404).send("Cart not found");
//     }

//     const itemIndex = cart.items.findIndex(
//       (cartItem) => cartItem.item.toString() === itemId
//     );

//     if (itemIndex > -1) {
//       let item = cart.items[itemIndex];
//       cart.bill -= item.quantity * item.price;

//       if (cart.bill < 0) {
//         cart.bill = 0;
//       }

//       cart.items.splice(itemIndex, 1);
//       cart.bill = cart.items.reduce(
//         (acc, curr) => acc + curr.quantity * curr.price,
//         0
//       );
//       cart = await cart.save();
//       res.status(200).send(cart);
//     } else {
//       res.status(404).send("Item not found in cart");
//     }
//   } catch (error) {
//     console.log("Error deleting item from cart:", error);
//     res.status(500).send("Something went wrong");
//   }
// });

// // Create Cart
// // router.post("/cart", Auth, async (req, res) => {
// //   const owner = req.user._id;
// //   const { itemId, quantity } = req.body;

// //   try {
// //     const cart = await Cart.findOne({ owner });
// //     const item = await Item.findOne({ _id: itemId });

// //     if (!item) {
// //       res.status(404).send({ message: "Item not found" });
// //       return;
// //     }

// //     const price = item.price;
// //     const name = item.name;

// //     if (cart) {
// //       const itemIndex = cart.items.findIndex(
// //         (cartItem) => cartItem.item.toString() === itemId
// //       );

// //       if (itemIndex > -1) {
// //         let product = cart.items[itemIndex];
// //         product.quantity += quantity;
// //         cart.bill = cart.items.reduce((acc, curr) => {
// //           return acc + curr.quantity * curr.price;
// //         }, 0);
// //         cart.items[itemIndex] = product;
// //       } else {
// //         cart.items.push({ item: itemId, name, quantity, price });
// //         cart.bill = cart.items.reduce((acc, curr) => {
// //           return acc + curr.quantity * curr.price;
// //         }, 0);
// //       }

// //       await cart.save();
// //       res.status(200).send(cart);
// //     } else {
// //       const newCart = await Cart.create({
// //         owner,
// //         items: [{ item: itemId, name, quantity, price }],
// //         bill: quantity * price,
// //       });
// //       res.status(201).send(newCart);
// //     }
// //   } catch (error) {
// //     console.error("Error creating cart:", error);
// //     res.status(500).send("Something went wrong");
// //   }
// // });

// router.post("/cart", Auth, async (req, res) => {
//   const owner = req.user._id;
//   const { itemId, quantity } = req.body;

//   try {
//     console.log("Creating a cart for owner:", owner);

//     // Ensure quantity is provided and is a positive number
//     if (!quantity || quantity <= 0) {
//       console.log("Invalid quantity:", quantity);
//       return res
//         .status(400)
//         .send({ message: "Quantity must be a positive number" });
//     }

//     console.log("Finding item with ID:", itemId);

//     // Find the cart and the item in the database
//     const cart = await Cart.findOne({ owner });
//     const item = await Item.findById(itemId);

//     if (!item) {
//       console.log("Item not found");
//       return res.status(404).send({ message: "Item not found" });
//     }

//     const price = item.price;
//     const name = item.name;

//     if (cart) {
//       console.log("Cart found for owner:", owner);

//       const itemIndex = cart.items.findIndex(
//         (cartItem) => cartItem.item.toString() === itemId
//       );

//       if (itemIndex > -1) {
//         console.log("Item already in cart. Updating quantity.");
//         let product = cart.items[itemIndex];
//         product.quantity += quantity;
//         cart.items[itemIndex] = product;
//       } else {
//         console.log("Item not in cart. Adding new item.");
//         cart.items.push({ item: itemId, name, quantity, price });
//       }

//       cart.bill = cart.items.reduce(
//         (acc, curr) => acc + curr.quantity * curr.price,
//         0
//       );
//       await cart.save();
//       console.log("Cart updated:", cart);
//       res.status(200).send(cart);
//     } else {
//       console.log("No cart found for owner. Creating new cart.");

//       const newCart = await Cart.create({
//         owner,
//         items: [{ item: itemId, name, quantity, price }],
//         bill: quantity * price,
//       });

//       console.log("New cart created:", newCart);
//       res.status(201).send(newCart);
//     }
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).send("Something went wrong");
//   }
// });

// module.exports = router;

// const express = require("express");
// const Cart = require("../models/cart");
// const Item = require("../models/item");
// const Auth = require("../middleware/auth");

// const router = new express.Router();

// // Get Cart
// router.get("/cart", Auth, async (req, res) => {
//   const owner = req.user._id;
//   try {
//     const cart = await Cart.findOne({ owner });
//     if (cart && cart.items.length > 0) {
//       res.status(200).send(cart);
//     } else {
//       res.send(null);
//     }
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// Create Cart

// router.post("/cart", Auth, async (req, res) => {
//   const owner = req.user._id;
//   const { itemId, quantity } = req.body;

//   try {
//     // Validate quantity
//     if (!quantity || quantity <= 0) {
//       return res
//         .status(400)
//         .send({ message: "Quantity must be a positive number" });
//     }

//     const cart = await Cart.findOne({ owner });
//     const item = await Item.findById(itemId);

//     if (!item) {
//       return res.status(404).send({ message: "Item not found" });
//     }

//     const price = item.price;
//     const name = item.name;

//     // Validate price
//     if (isNaN(price) || price <= 0) {
//       return res.status(500).send({ message: "Invalid item price" });
//     }

//     if (cart) {
//       const itemIndex = cart.items.findIndex(
//         (cartItem) => cartItem.item.toString() === itemId
//       );

//       if (itemIndex > -1) {
//         let product = cart.items[itemIndex];
//         product.quantity += quantity;
//         product.price = price; // Ensure price is set
//         cart.items[itemIndex] = product;
//       } else {
//         cart.items.push({ item: itemId, name, quantity, price });
//       }

//       // Calculate the new bill
//       let newBill = 0;
//       cart.items.forEach((cartItem) => {
//         const itemPrice = cartItem.price;
//         const itemQuantity = cartItem.quantity;

//         // Ensure valid price and quantity
//         if (
//           isNaN(itemPrice) ||
//           isNaN(itemQuantity) ||
//           itemPrice <= 0 ||
//           itemQuantity <= 0
//         ) {
//           console.log(
//             `Invalid quantity or price for item ${cartItem.item}: ${itemQuantity}, ${itemPrice}`
//           );
//         } else {
//           newBill += itemQuantity * itemPrice;
//         }
//       });

//       // Ensure the bill is a valid number
//       if (isNaN(newBill) || newBill < 0) {
//         throw new Error("Calculated bill is not a valid number");
//       }

//       cart.bill = newBill;

//       await cart.save();
//       res.status(200).send(cart);
//     } else {
//       const initialBill = quantity * price;
//       if (isNaN(initialBill) || initialBill <= 0) {
//         throw new Error("Initial bill calculation failed");
//       }

//       const newCart = await Cart.create({
//         owner,
//         items: [{ item: itemId, name, quantity, price }],
//         bill: initialBill,
//       });

//       res.status(201).send(newCart);
//     }
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).send("Something went wrong");
//   }
// });

// router.post("/cart", Auth, async (req, res) => {
//   const owner = req.user._id;
//   const { itemId, quantity } = req.body;

//   try {
//     // Validate quantity
//     if (!quantity || quantity <= 0) {
//       return res
//         .status(400)
//         .send({ message: "Quantity must be a positive number" });
//     }

//     // Fetch the item details
//     const item = await Item.findById(itemId);
//     if (!item) {
//       return res.status(404).send({ message: "Item not found" });
//     }

//     const price = item.price;
//     const name = item.name;

//     // Validate price
//     if (isNaN(price) || price <= 0) {
//       return res.status(500).send({ message: "Invalid item price" });
//     }

//     // Find or create the cart
//     let cart = await Cart.findOne({ owner });

//     if (cart) {
//       // Cart exists, update it
//       const itemIndex = cart.items.findIndex(
//         (cartItem) => cartItem.item.toString() === itemId
//       );

//       if (itemIndex > -1) {
//         // Item exists in the cart, update quantity
//         let product = cart.items[itemIndex];
//         product.quantity += quantity;
//         product.price = price; // Ensure price is set
//         cart.items[itemIndex] = product;
//       } else {
//         // Item does not exist in the cart, add new item
//         cart.items.push({ item: itemId, name, quantity, price });
//       }

//       // Recalculate the total bill
//       let newBill = 0;
//       cart.items.forEach((cartItem) => {
//         const itemPrice = cartItem.price;

//         const itemQuantity = cartItem.quantity;

//         // Ensure valid price and quantity
//         if (
//           isNaN(itemPrice) ||
//           isNaN(itemQuantity) ||
//           itemPrice <= 0 ||
//           itemQuantity <= 0
//         ) {
//           console.log(
//             `Invalid quantity or price for item ${cartItem.item}: ${itemQuantity}, ${itemPrice}`
//           );
//           console.log("ItemPrice:", itemPrice);
//           console.log("cartItem:", cartItem.item);
//         } else {
//           newBill += itemQuantity * itemPrice;
//         }
//       });

//       // Ensure the bill is a valid number
//       if (isNaN(newBill) || newBill < 0) {
//         throw new Error("Calculated bill is not a valid number");
//       }

//       cart.bill = newBill;

//       // Save and respond
//       await cart.save();
//       res.status(200).send(cart);
//     } else {
//       // No cart exists, create a new one
//       const initialBill = quantity * price;
//       if (isNaN(initialBill) || initialBill <= 0) {
//         throw new Error("Initial bill calculation failed");
//       }

//       const newCart = await Cart.create({
//         owner,
//         items: [{ item: itemId, name, quantity, price }],
//         bill: initialBill,
//       });

//       res.status(201).send(newCart);
//     }
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).send("Something went wrong");
//   }
// });

// // Delete Items in cart
// // router.delete("/cart/", Auth, async (req, res) => {
// //   const owner = req.user._id;
// //   const itemId = req.query.itemId;
// //   try {
// //     let cart = await Cart.findOne({ owner });
// //     const itemIndex = cart.items.findIndex(
// //       (cartItem) => cartItem.item.toString() === itemId
// //     );
// //     if (itemIndex > -1) {
// //       let item = cart.items[itemIndex];
// //       cart.bill -= item.quantity * item.price;
// //       if (cart.bill < 0) {
// //         cart.bill = 0;
// //       }
// //       cart.items.splice(itemIndex, 1);
// //       cart.bill = cart.items.reduce((acc, curr) => {
// //         return acc + curr.quantity * curr.price;
// //       }, 0);
// //       cart = await cart.save();
// //       res.status(200).send(cart);
// //     } else {
// //       res.status(404).send("Item not found");
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(400).send();
// //   }
// // });

// router.delete("/cart", Auth, async (req, res) => {
//   const owner = req.user._id;
//   const itemId = req.query.itemId;

//   try {
//     let cart = await Cart.findOne({ owner });

//     if (!cart) {
//       return res.status(404).send("Cart not found");
//     }

//     const itemIndex = cart.items.findIndex(
//       (cartItem) => cartItem.item.toString() === itemId
//     );

//     if (itemIndex === -1) {
//       return res.status(404).send("Item not found in cart");
//     }

//     // Retrieve item price from the database if not stored in cart
//     const item = await Item.findById(itemId);

//     if (!item) {
//       return res.status(404).send("Item not found");
//     }

//     const price = item.price;
//     const itemQuantity = cart.items[itemIndex].quantity;

//     if (isNaN(price) || price <= 0) {
//       return res.status(500).send("Invalid item price");
//     }

//     // Remove item from the cart
//     cart.bill -= itemQuantity * price;

//     if (cart.bill < 0) {
//       cart.bill = 0;
//     }

//     cart.items.splice(itemIndex, 1);

//     // Recalculate total bill for remaining items
//     cart.bill = cart.items.reduce((acc, curr) => {
//       const itemPrice = item.price; // Use item.price if it should be recalculated
//       return acc + curr.quantity * itemPrice;
//     }, 0);

//     cart = await cart.save();
//     res.status(200).send(cart);
//   } catch (error) {
//     console.error("Error deleting item from cart:", error);
//     res.status(500).send("Something went wrong");
//   }
// });

// module.exports = router;
