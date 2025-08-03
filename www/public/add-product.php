<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product Add</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Product Add</h1>
    <div class="action-buttons">
      <button id="save-product-btn">Save</button>
      <button id="cancel-btn">Cancel</button>
    </div>
  </header>

  <main>
    <form id="product_form">
      <div class="form-group">
        <label for="sku">SKU</label>
        <input type="text" id="sku" name="sku" required>
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>

      <div class="form-group">
        <label for="price">Price ($)</label>
        <input type="number" id="price" name="price" step="0.01" required>
      </div>

      <div class="form-group">
        <label for="productType">Type Switcher</label>
        <select id="productType" name="productType" required>
          <option value="">Type Switcher</option>
          <option value="DVD" id="DVD">DVD</option>
          <option value="Furniture" id="Furniture">Furniture</option>
          <option value="Book" id="Book">Book</option>
        </select>
      </div>

      <!-- DVD Specific Fields -->
      <div id="dvd-options" class="type-options">
        <div class="form-group">
          <label for="size">Size (MB)</label>
          <input type="number" id="size" name="size">
          <p class="description">Please provide size in MB</p>
        </div>
      </div>

      <!-- Furniture Specific Fields -->
      <div id="furniture-options" class="type-options" style="display: none;">
        <div class="form-group">
          <label for="height">Height (CM)</label>
          <input type="number" id="height" name="height">
        </div>
        <div class="form-group">
          <label for="width">Width (CM)</label>
          <input type="number" id="width" name="width">
        </div>
        <div class="form-group">
          <label for="length">Length (CM)</label>
          <input type="number" id="length" name="length">
        </div>
        <p class="description">Please provide dimensions in HxWxL format</p>
      </div>

      <!-- Book Specific Fields -->
      <div id="book-options" class="type-options" style="display: none;">
        <div class="form-group">
          <label for="weight">Weight (KG)</label>
          <input type="number" id="weight" name="weight" step="0.01">
          <p class="description">Please provide weight in KG</p>
        </div>
      </div>
    </form>
  </main>

  <footer>
    <p>Scandiweb Test assignment</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>