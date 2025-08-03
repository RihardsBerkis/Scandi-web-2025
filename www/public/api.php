<?php
    $pdo = new PDO('mysql:host=192.168.33.10;dbname=test', "root", "root");
    $products = $pdo->query("SELECT * FROM products");
    
    echo json_encode($products->fetchALL(PDO :: FETCH_ASSOC));
    
