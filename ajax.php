<style>
    <?php

    include "style.css";
    ?>
</style>

<?php
//Including Database configuration file.
include "db.php";


//Getting value of "search" variable from "script.js".
if (isset($_POST['search'])) {
    //Search box value assigning to $Name variable.
    $name = $_POST['search'];
    //Search query.
    $Query = "SELECT * FROM music WHERE name LIKE '%$name%' limit 7";
    //Query execution
    $ExecQuery = MySQLi_query($con, $Query);



    $sql = "SELECT *  FROM music where name=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id,$name,$artist,$image,$path);

    $response = [
        'status' => "ok",
        'success' => true,
        'path' => "$path"

    ];
    print_r(json_encode($response));
    //Creating unordered list to display result.
    echo '
<ul type="none">
   ';
    //Fetching result from database.
    while ($Result = MySQLi_fetch_array($ExecQuery)) {

?>
        <!-- Creating unordered list items.
        Calling javascript function named as "fill" found in "script.js" file.
        By passing fetched result as parameter. -->
        <li id="search-list" onclick='fill("<?php echo $Result['name']; ?>")'>
            <a>
                <!-- Assigning searched result in "Search box" in "search.php" file. -->
                <?php echo $Result['name']; ?>




        </li></a>
        <!-- Below php code is just for closing parenthesis. Don't be confused. -->
<?php
    }
}
?>
</ul>