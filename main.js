

// const buttonAR = document.querySelectorAll('.buttonAR')
// buttonAR.forEach(function(button){
// const buttonA = button.querySelector('#buttonA')
// const buttonR = button.querySelector('#buttonR')
// const priceP = button.querySelector('#priceP')
// console.log('working ne')

// let count = 1;

// buttonR.onclick = function() {
//     if (count > 1)
//     {
//         count--;
//         priceP.value = count;
//     }
//     console.log('working')
// }

// buttonA.onclick = function() {
//     count++;
//     priceP.value = count;
//     console.log('working')
// }
// })
// let carts = [
//   {
//     id: 'qhZ2wNwZZW63',
//     productId: 'hBuZdx1elR5a',
//     quantity: 2,
//   },
//   {
//     id: 'gijYjCti3BvR',
//     productId: 'fDQWzrgq6gXX',
//     quantity: 1,
//   },
//   {
//     id: 'RQpImf7zc8ao',
//     productId: 'aLjNSdeJi9Q2',
//     quantity: 3,
//   },


import { PRODUCTS, carts, createId } from './js/app.js'

const itemData = document.querySelector('#listProducts')

async function loadItem() {
  try {
    itemData.innerHTML = PRODUCTS
      .map(item => `
        <div class="row align-items-center p-2">
          <div class="col-6 col-md-4">
            <img src="img/${item.thumb}" alt="" class="img-fluid">
          </div>
          <div class="col-6 col-md-8">
            <h6 id="${item.id}" class="blockquote nameP">${item.name}</h6>
            <p class="blockquote-footer"><small>${item.shortDesc}</small></p>
            <div class="form-group">
              <div id="buttonAR" class="d-flex">
                <button class="btn btn-primary buttonR"> - </button>
                <input type="text" class="form-control mx-1 quantityP" value="1" min="1">
                <button class="btn btn-primary buttonA"> + </button>
              </div>
              <button class="btn btn-danger btn-block mt-1 btn-add-to-cart">${item.price}</button>
            </div>
          </div>
        </div>
      `)
      .join('');
  } catch (error) {
    console.error(error)
  }
}

loadItem()

itemData.addEventListener('click', function (event) {
  if (event.target.classList.contains('buttonR')) {
    const input = event.target.parentNode.querySelector('.quantityP')
    let count = parseInt(input.value) || 0
    if (count > 1) {
      count--
      input.value = count
    }
  } else if (event.target.classList.contains('buttonA')) {
    const input = event.target.parentNode.querySelector('.quantityP')
    let count = parseInt(input.value) || 0
    count++
    input.value = count
  }
})

const cardProducts = document.getElementById('cardProducts');
const oldCarts = [...carts];
let newCarts = [];
function renderCart() {
  let cartItems = [...newCarts || oldCarts];
  const counts = document.getElementById('count')
  const toTals = document.getElementById('toTal')
  cardProducts.innerHTML = "";
  let count = 0;
  let total = 0; 
  cartItems.forEach((item, index) => {
    let product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      const subTotal = item.quantity * product.price;
      total += subTotal;
      count += item.quantity;
      cardProducts.innerHTML += `
        <tr id="${item.id}">
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>$${product.price}</td>
          <td>
            <input type="number" class="form-control qUpdate" value="${item.quantity}">
          </td>
          <td><span class="fw-bold">$${subTotal}</span></td>
          <td>
            <button type="button" class="btn btn-link btn-sm btn-rounded btnUpdate">Update</button>
            <button type="button" class="btn btn-link btn-sm btn-rounded btnDelete">Delete</button>
          </td>
        </tr>
      `;
    }
  });
  counts.textContent = count;
  toTals.textContent = `$${total}`;
}

function findCartItem(productId) {
  return newCarts.find((item) => item.productId === productId);
}

itemData.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-add-to-cart")) {
    let productId = event.target.parentNode.parentNode.querySelector(".nameP").id;
    let quantityInput = event.target.parentNode.querySelector(".quantityP");
    let quantity = parseInt(quantityInput.value) || 1;
    let matchItem = findCartItem(productId);
    if(matchItem) {
      matchItem.quantity += quantity;
    } else {
      let newCartItem = {
        id: createId(),
        productId,
        quantity,
      };
      newCarts.push(newCartItem);
    }
    renderCart();
  }
});

cardProducts.addEventListener('click', function(event) {
  if (event.target.classList.contains('btnDelete')) {
    const id = event.target.parentNode.parentNode.id;
    const itemIndex = newCarts.findIndex(item => item.id === id);
    if (itemIndex >= 0) {
      newCarts.splice(itemIndex, 1);
      renderCart();
    }
  }
});

// const updateBtns = document.querySelectorAll('.btnUpdate');
// updateBtns.forEach(updateBtn => {
//   updateBtn.addEventListener('click', () => {
//     const id = updateBtn.parentNode.parentNode.id;
//     const itemIndex = newCarts.findIndex(item => item.id === id);
//     const quantityInput = updateBtn.parentNode.querySelector('.qUpdate');
//     const quantity = parseInt(quantityInput.value) || 1;
//     if (itemIndex >= 0) {
//       newCarts[itemIndex].quantity = quantity;
//       renderCart();
//     }
//   });
// });

cardProducts.addEventListener('click', function(event) {
  if (event.target.classList.contains('btnUpdate')) {
    const id = event.target.parentNode.parentNode.id;
    const itemIndex = newCarts.findIndex(item => item.id === id);
    const quantityInput = event.target.parentNode.parentNode.querySelector('.qUpdate');
    const quantity = parseInt(quantityInput.value) || 1;
    if (itemIndex >= 0) {
      newCarts[itemIndex].quantity = quantity;
      renderCart();
    }
  }
});

// const updateBtns = document.querySelectorAll('.btnUpdate');
// updateBtns.forEach(updateBtn => {
//   updateBtn.addEventListener('click', () => {
//     const inputEl = updateBtn.parentNode.parentNode.querySelector('.qUpdate');
//     const id = updateBtn.parentNode.parentNode.id;
//     const quantity = parseInt(inputEl.value) || 1;
//     const itemIndex = newCarts.findIndex(item => item.id === id);
//     if (itemIndex >= 0) {
//       newCarts[itemIndex].quantity = quantity;
//       renderCart();
//     }
//   });
// });



// const cardProducts = document.getElementById('cardProducts');
// const oldCarts = [...carts];
// let currentCarts = [];
// function renderCart() {
//   let cartItems = [...currentCarts || oldCarts];
//   const counts = document.getElementById('count')
//   const toTals = document.getElementById('toTal')
//   cardProducts.innerHTML = "";
//   let count = 0;
//   let total = 0; 
//   cartItems.forEach((item, index) => {
//     let product = PRODUCTS.find((p) => p.id === item.productId);
//     if (product) {
//       const subTotal = item.quantity * product.price;
//       total += subTotal;
//       count += item.quantity;
//       cardProducts.innerHTML += `
//         <tr id="${item.id}">
//           <td>${index + 1}</td>
//           <td>${product.name}</td>
//           <td>$${product.price}</td>
//           <td>
//             <input type="number" class="form-control" value="${item.quantity}">
//           </td>
//           <td><span class="fw-bold">$${subTotal}</span></td>
//           <td>
//             <button type="button" class="btn btn-link btn-sm btn-rounded btnUpdate">Update</button>
//             <button type="button" class="btn btn-link btn-sm btn-rounded btnDelete" onclick="removeItem(${item.id})">Delete</button>
//           </td>
//         </tr>
//       `;
//     }
//   });
//   counts.textContent = count;
//   toTals.textContent = `$${total}`;
// }

// function findCartItem(productId) {
//   return currentCarts.find((item) => item.productId === productId);
// }

// itemData.addEventListener("click", function (event) {
//   if (event.target.classList.contains("btn-add-to-cart")) {
//     let productId = event.target.parentNode.parentNode.querySelector(".blockquote").id;
//     let quantityInput = event.target.parentNode.querySelector(".priceP");
//     let quantity = parseInt(quantityInput.value) || 1;
//     if (currentCarts === null) {
//       currentCarts = [];
//     }
//     let existingCartItem = findCartItem(productId);
//     if(existingCartItem) {
//       existingCartItem.quantity += quantity;
//     } else {
//       let newCartItem = {
//         id: createId(),
//         productId,
//         quantity,
//       };
//       currentCarts.push(newCartItem);
//     }
//     renderCart();
//   }
// });

// const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
// addToCartButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const productId = button.dataset.productId;
//     const pCartItem = cartItems.find((item) => item.productId === productId);
//     if (pCartItem) {
//       pCartItem.quantity++;
//     } else {
//       cartItems.push({
//         id: createId(),
//         productId: productId,
//         quantity: 1,
//       })
//     }
//     renderCart();
//   })
// })


// const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
// const cardProducts = document.getElementById('cardProducts');
// const counts = document.getElementById('count')
// const toTals = document.getElementById('toTal')



// let cartItems = [...carts]




// function updateCart() {
//   cardProducts.innerHTML = '';
//   let count = 0;
//   let total = 0; 
//   cartItems.forEach((item, index) => {
//     const product = PRODUCTS.find((p) => p.id === item.productId);
//     if (product) {
//       const subTotal = item.quantity * product.price;
//       total += subTotal;
//       count += item.quantity;
//       cardProducts.innerHTML += `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${product.name}</td>
//           <td>$${product.price}</td>
//           <td>
//             <input type="number" class="form-control" value="${item.quantity}">
//           </td>
//           <td><span class="fw-bold">$${subTotal}</span></td>
//           <td>
//             <button type="button" class="btn btn-link btn-sm btn-rounded btnUpdate">Update</button>
//             <button type="button" class="btn btn-link btn-sm btn-rounded btnDelete" onclick="removeItem(${item.productId})">Delete</button>
//           </td>
//         </tr>
//       `;
//     }
//   });
//   counts.textContent = count;
//   toTals.textContent = `$${total}`;
// }

// function removeItem(id) {
//   cartItems = cartItems.filter(item => item.productId !== id);
//   updateCart();
// }


// cardProducts.addEventListener('change', function(event) {
//   if (event.target.classList.contains('form-control')) {
//     const input = event.target;
//     const quantity = parseInt(input.value) || 0;
//     const productId = input.closest('tr').querySelector('.btnUpdate').dataset.productId;
//     const pCartItem = cartItems.find((item) => item.productId === productId);
//     if (pCartItem) {
//       pCartItem.quantity = quantity;
//     }
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     updateCart();
//   }
// });





// const updateButtons = document.querySelectorAll(".btn-update");
// updateButtons.forEach((button, index) => {
//   button.addEventListener('click', () => {
//     const quantity = document.querySelectorAll(".form-control")[index].value;
//     updateCartItemQ(index, quantity);
//   });
// });

// const deleteButtons = document.querySelectorAll(".btnDelete");
//   deleteButtons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//       const td = event.target.parentNode.parentNode;
//       td.remove();
//       console.log('đã xóa thành công');
//     });
//   });

// addToCartButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const productId = button.dataset.productId;
//     const pCartItem = cartItems.find((item) => item.productId === productId);
//     if (pCartItem) {
//       pCartItem.quantity++;
//     } else {
//       cartItems.push({
//         id: createId(),
//         product: {
//           id: productId,
//           name: PRODUCTS.name,
//           price: PRODUCTS.price,
//         },
//         quantity: 1,
//       })
//     }
//     updateCart();
//   })
// })






// // Lặp qua từng button và gán sự kiện "click"
// addToCartButtons.forEach((addToCartButton) => {
//   addToCartButton.addEventListener("click", addToCartClicked);
// });

// // Hàm xử lý khi click vào button "btn-add-to-cart"
// function addToCartClicked(event) {
//   const button = event.target;
//   const product = button.parentElement.parentElement;
//   const productName = product.querySelector("td:nth-child(2)").innerText;
//   const productPrice = product.querySelector("td:nth-child(3)").innerText;
//   const productQuantity = product.querySelector("td:nth-child(4) input").value;
//   addItemToCart(productName, productPrice, productQuantity);
//   updateCartTotal();
// }

// // Hàm thêm sản phẩm vào giỏ hàng
// function addItemToCart(productName, productPrice, productQuantity) {
//   const cartRow = document.createElement("tr");
//   cartRow.classList.add("cart-row");
//   const cartItems = document.querySelector("#cardProducts");
//   const cartItemNames = cartItems.querySelectorAll(".cart-item-title");
//   cartItemNames.forEach((cartItemName) => {
//     if (cartItemName.innerText === productName) {
//       alert("This item is already added to the cart");
//       return;
//     }
//   });
//   const cartRowContents = `
//     <td class="cart-item-number">${cartItems.childElementCount}</td>
//     <td class="cart-item-title">${productName}</td>
//     <td class="cart-item-price">${productPrice}</td>
//     <td class="cart-item-quantity">${productQuantity}</td>
//     <td class="cart-item-subtotal">${
//       productPrice * productQuantity
//     }</td>
//     <td><button class="btn btn-link btn-sm btn-rounded" type="button">Update</button>
//     <button class="btn btn-link btn-sm btn-rounded" type="button">Delete</button></td>
//   `;
//   cartRow.innerHTML = cartRowContents;
//   cartItems.append(cartRow);
//   cartRow
//     .querySelector(".btn-rounded:nth-child(2)")
//     .addEventListener("click", removeCartItem);
//   cartRow
//     .querySelector(".cart-item-quantity")
//     .addEventListener("change", quantityChanged);
// }

// // Hàm update tổng tiền giỏ hàng
// function updateCartTotal() {
//   const cartItemContainer = document.querySelector("#cardProducts");
//   const cartRows = cartItemContainer.querySelectorAll(".cart-row");
//   let total = 0;
//   let count = 0;
//   cartRows.forEach((cartRow) => {
//     const priceElement = cartRow.querySelector(".cart-item-price");
//     const quantityElement = cartRow.querySelector(".cart-item-quantity");
//     const price = parseFloat(priceElement.innerText.replace("$", ""));
//     const quantity = quantityElement.value;
//     const subtotalElement = cartRow.querySelector(".cart-item-subtotal");
//     const subtotal = price * quantity;
//     subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
//     total += subtotal;
//     count += parseInt(quantity);
//   });
//   document.querySelector("#count").innerText = count;
//   document.querySelector("#toTal").innerText = `$${total.toFixed(2)}`;
// }

// // Hàm xóa sản phẩm khỏi giỏ hàng
// // function removeCartItem(event) {
// //   const buttonClicked = event.target;
// //   buttonClicked.parentElement.parentElement.remove

// import { carts } from './app.js';

// const addToCart = (productId) => {
//     const existingCartItem = carts.find(cartItem => cartItem.productId === productId);
//     if (existingCartItem) {
//         existingCartItem.quantity++;
//     } else {
//         carts.push({
//             id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
//             productId: productId,
//             quantity: 1,
//         });
//     }
//     renderCart();
// }

// const updateCartItem = (productId, quantity) => {
//     const cartItem = carts.find(cartItem => cartItem.productId === productId);
//     if (cartItem) {
//         cartItem.quantity = quantity;
//         renderCart();
//     }
// }

// const deleteCartItem = (productId) => {
//     const cartItemIndex = carts.findIndex(cartItem => cartItem.productId === productId);
//     if (cartItemIndex !== -1) {
//         carts.splice(cartItemIndex, 1);
//         renderCart();
//     }
// }

// const getTotalPrice = () => {
//     let totalPrice = 0;
//     for (const cartItem of carts) {
//         const product = products.find(product => product.id === cartItem.productId);
//         totalPrice += product.price * cartItem.quantity;
//     }
//     return totalPrice;
// }

// const renderCart = () => {
//     const cartProductsTable = document.getElementById('cardProducts');
//     cartProductsTable.innerHTML = '';
//     let itemCount = 0;
//     for (const cartItem of carts) {
//         const product = products.find(product => product.id === cartItem.productId);
//         itemCount += cartItem.quantity;
//         cartProductsTable.innerHTML += `
//             <tr>
//                 <td>${cartItem.id}</td>
//                 <td>${product.name}</td>
//                 <td>$${product.price}</td>
//                 <td>
//                     <input type="number" class="form-control" value="${cartItem.quantity}" onchange="updateCartItem('${product.id}', this.value)">
//                 </td>
//                 <td><span class="fw-bold">$${product.price * cartItem.quantity}</span></td>
//                 <td>
//                     <button type="button" class="btn btn-link btn-sm btn
