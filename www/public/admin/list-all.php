<?php
    $pdo = new PDO('mysql:host=192.168.33.10;dbname=test', "root", "root");
    $products = $pdo->query("SELECT * FROM products");
    
    $products = $products->fetchALL(PDO :: FETCH_ASSOC);
    ?>

    <ul>
        <li>
            <a href="/admin/creat.php">Create product </a>
        </li>
    </ul>

<div>
    <ul>
        <?php foreach($products as $product): ?>
        <li>
            <div>ID: <?= $product["id"] ?></div>
            <div>SKU: <?= $product["sku"] ?></div>
            <div>PRICE: <?= $product["price"] ?></div>
            <div>NAME: <?= $product["name"] ?></div>
            <div>
                <a href="/admin/delete-by-id.php?id=<?= $product["id"] ?>" >delete</a>
                <a href="/admin/edit-by-id.php?id=<?= $product["id"] ?>">edit</a>
        </li>
        <?php endforeach ?>
    </ul>
</div>
    
