<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Product List</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Product List</h1>
    <p><?php echo "the current PHP version in use is " . phpversion(); ?></p>
    
    <div class="action-buttons">
      <a href="add-product.php" id="add-product-btn">ADD</a>
      <button id="delete-product-btn">MASS DELETE</button>
    </div>
  </header>

  <main class="product-grid">
    <!-- Products will be loaded here by JavaScript -->
  </main>

  <footer>
    <p>Scandiweb Test assignment</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>