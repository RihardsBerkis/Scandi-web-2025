<?php
    $pdo = new PDO('mysql:host=192.168.33.10;dbname=test', "root", "root");
    $query = $pdo->prepare("SELECT * FROM products WHERE id=:id");
    $query->execute([ ":id" => $_GET['id'] ]);
    
    $product = $query->fetch(PDO::FETCH_ASSOC);

    ?>

<form action="/admin/save-by-id.php?id=<?= $_GET['id'] ?>" method="post">
  <div>
    <label for="sku">sku:</label>
    <input type="text" id="sku" name="sku" value="<?= $product['sku'] ?>" />
  </div>
  <div>
    <label for="price">price:</label>
    <input type="number" id="price" name="price" value="<?= $product['price'] ?>" />
</div>
  <div>
    <label for="name">name:</label>
    <input type="text" id="name" name="name" value="<?= $product['name'] ?>" />
</div>
<div>
    <button type="submit">Save product</button>
</div>
</form>
