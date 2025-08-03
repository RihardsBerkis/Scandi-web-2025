let products = [];

async function getData() {
  const url = "/api.php"; // PHP endpoint that returns JSON
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    products = json;
    console.log('Products from DB:', products);

    // Render the products on the page if the grid exists
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
      renderProducts(productGrid);
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
    // Fallback to localStorage
    products = JSON.parse(localStorage.getItem('products')) || [];
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
      renderProducts(productGrid);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  getData();

  if (window.location.pathname.includes('index.php') || window.location.pathname === '/') {
    setupProductListPage();
  } else if (window.location.pathname.includes('add-product.php')) {
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
  const cancelBtn = document.getElementById('cancel-btn');

  if (productType) {
    productType.addEventListener('change', handleProductTypeChange);
  }

  if (saveProductBtn) {
    saveProductBtn.addEventListener('click', handleSaveProduct);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      window.location.href = 'index.php'; // Go back to product list
    });
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

  product.sku = document.getElementById('sku').value.trim();
  product.name = document.getElementById('name').value.trim();
  product.price = document.getElementById('price').value.trim();
  product.type = type;

  if (!product.sku || !product.name || !product.price || !product.type) {
    alert('Please fill in all required fields');
    return;
  }

  if (type === 'DVD') {
    const size = document.getElementById('size').value.trim();
    if (!size) {
      alert('Please fill in size');
      return;
    }
    product.size = size;
    product.description = `Size: ${size} MB`;
  } else if (type === 'Furniture') {
    product.height = document.getElementById('height').value.trim();
    product.width = document.getElementById('width').value.trim();
    product.length = document.getElementById('length').value.trim();

    if (!product.height || !product.width || !product.length) {
      alert('Please fill in all dimensions');
      return;
    }

    product.description = `Dimension: ${product.height}x${product.width}x${product.length}`;
  } else if (type === 'Book') {
    const weight = document.getElementById('weight').value.trim();
    if (!weight) {
      alert('Please fill in weight');
      return;
    }
    product.weight = weight;
    product.description = `Weight: ${weight}KG`;
  }

  // Send product to PHP API for saving
  fetch('save-product.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Save response:', data);
    window.location.href = 'index.php';
  })
  .catch(err => {
    console.error('Error saving product:', err);
    alert('Failed to save product. Please try again.');
  });
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

  // Send delete request to backend
  fetch('delete-products.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skus: skusToDelete })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Delete response:', data);
    window.location.reload();
  })
  .catch(err => {
    console.error('Error deleting products:', err);
    alert('Failed to delete products. Please try again.');
  });
}

function renderProducts(container) {
  container.innerHTML = '';

  products.forEach(product => {
    const productBox = document.createElement('div');
    productBox.className = 'product-box';

    let description = product.description || '';
    if (!description) {
      if (product.size) {
        description = `Size: ${product.size} MB`;
      } else if (product.weight) {
        description = `Weight: ${product.weight} KG`;
      } else if (product.height && product.width && product.length) {
        description = `Dimension: ${product.height}x${product.width}x${product.length}`;
      }
    }

    productBox.innerHTML = `
      <input type="checkbox" class="delete-checkbox" />
      <p>${product.sku}</p>
      <p>${product.name}</p>
      <p>${product.price} $</p>
      <p>${description}</p>
    `;

    container.appendChild(productBox);
  });
}
