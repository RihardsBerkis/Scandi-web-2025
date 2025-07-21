
let products = JSON.parse(localStorage.getItem('products')) || [];


document.addEventListener('DOMContentLoaded', function() {
  
  loadProducts();
  
  
  if (window.location.pathname.includes('index.html') || 
      window.location.pathname === '/') {
    setupProductListPage();
  } else if (window.location.pathname.includes('add-product.html')) {
    setupAddProductPage();
  }
});

function setupProductListPage() {
  const deleteProductBtn = document.getElementById('delete-product-btn');
  
  if (deleteProductBtn) {
    deleteProductBtn.addEventListener('click', handleMassDelete);
  }
}

function setupAddProductPage() {
  const productType = document.getElementById('productType');
  const saveProductBtn = document.getElementById('save-product-btn');
  
  if (productType) {
    productType.addEventListener('change', handleProductTypeChange);
  }
  
  if (saveProductBtn) {
    saveProductBtn.addEventListener('click', handleSaveProduct);
  }
}

function handleProductTypeChange(e) {
  const type = e.target.value;
  const dvdOptions = document.getElementById('dvd-options');
  const furnitureOptions = document.getElementById('furniture-options');
  const bookOptions = document.getElementById('book-options');
  
  
  dvdOptions.style.display = 'none';
  furnitureOptions.style.display = 'none';
  bookOptions.style.display = 'none';
  
  
  if (type === 'DVD') {
    dvdOptions.style.display = 'block';
  } else if (type === 'Furniture') {
    furnitureOptions.style.display = 'block';
  } else if (type === 'Book') {
    bookOptions.style.display = 'block';
  }
}

function handleSaveProduct(e) {
  e.preventDefault();
  
  const type = document.getElementById('productType').value;
  let product = {};
  
  
  product.sku = document.getElementById('sku').value;
  product.name = document.getElementById('name').value;
  product.price = document.getElementById('price').value;
  product.type = type;
  
  
  if (!product.sku || !product.name || !product.price || !product.type) {
    alert('Please fill in all required fields');
    return;
  }
  
  
  if (type === 'DVD') {
    const size = document.getElementById('size').value;
    if (!size) {
      alert('Please fill in size');
      return;
    }
    product.size = size;
    product.description = `Size: ${size} MB`;
  } 
  else if (type === 'Furniture') {
    product.height = document.getElementById('height').value;
    product.width = document.getElementById('width').value;
    product.length = document.getElementById('length').value;
    
    if (!product.height || !product.width || !product.length) {
      alert('Please fill in all dimensions');
      return;
    }
    
    product.description = `Dimension: ${product.height}x${product.width}x${product.length}`;
  } 
  else if (type === 'Book') {
    const weight = document.getElementById('weight').value;
    if (!weight) {
      alert('Please fill in weight');
      return;
    }
    product.weight = weight;
    product.description = `Weight: ${weight}KG`;
  }
  
  
  if (products.some(p => p.sku === product.sku)) {
    alert('SKU already exists. Please use a unique SKU.');
    return;
  }
  
  
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  
  
  window.location.href = 'index.html';
}

function handleMassDelete() {
  const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
  
  if (checkboxes.length === 0) {
    alert('Please select at least one product to delete');
    return;
  }
  
  
  const skusToDelete = Array.from(checkboxes).map(checkbox => {
    return checkbox.closest('.product-box').querySelector('p:first-child').textContent;
  });
  
  
  products = products.filter(product => !skusToDelete.includes(product.sku));
  localStorage.setItem('products', JSON.stringify(products));
  
  
  window.location.reload();
}

function loadProducts() {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  
  
  productGrid.innerHTML = '';
  
  
  products.forEach(product => {
    const productBox = document.createElement('div');
    productBox.className = 'product-box';
    
    productBox.innerHTML = `
      <input type="checkbox" class="delete-checkbox" />
      <p>${product.sku}</p>
      <p>${product.name}</p>
      <p>${product.price} $</p>
      <p>${product.description}</p>
    `;
    
    productGrid.appendChild(productBox);
  });
}
function setupAddProductPage() {
  const productType = document.getElementById('productType');
  const saveProductBtn = document.getElementById('save-product-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  
  if (productType) {
    productType.addEventListener('change', handleProductTypeChange);
  }
  
  if (saveProductBtn) {
    saveProductBtn.addEventListener('click', handleSaveProduct);
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      window.location.href = 'index.html'; // Navigate back to product list
    });
  }
}