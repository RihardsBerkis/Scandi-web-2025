<?php
    $pdo = new PDO('mysql:host=192.168.33.10;dbname=test', "root", "root");
   
    
    $query = $pdo->prepare("UPDATE products SET sku=:sku, name=:name, price=:price WHERE id=:id");
    $query->bindParam(":id", $_GET["id"]);
    $query->bindParam(":sku", $_POST["sku"]);
    $query->bindParam(":name", $_POST["name"]);
    $query->bindParam(":price", $_POST["price"]);

    $query->execute();

    header("location:/admin/list-all.php");
