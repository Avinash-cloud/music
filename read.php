<?php
$i=$_POST['id'];
$con = mysqli_connect("localhost" , "root" , "1234" , "ajaxinfo");
$sql="SELECT *  FROM music where id=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $i);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id,$name,$artist,$image,$path);
$stmt->fetch();
$stmt->close();

// echo ("<table width='100%' border='2px'>  
// <tr> 
// <th>name</th>
// <th>age</th>
// <th>Email</th>
// <th>Password</th>
// </tr>
// ");
// print("<tr>");

// print("<td>". $id."</td>");
//     print("<td>". $name."</td>");
//    print("<td>". $artist."</td>");
//     print("<td>".$image."</td>");
//     print("<td>".$path."</td>");
// print("</tr>");

    $response=[
        'status' =>"ok",
        'success' =>true,
        'id' =>"$id",
        'name' =>"$name",
        'artist' =>"$artist",
        'image' =>"$image",
        'path' =>"$path"

    ];
    print_r(json_encode($response));

?>
