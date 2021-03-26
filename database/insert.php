
<?php

   include('connect.ini.php');
   
   $sql = "SELECT Name , Sex FROM login WHERE ID = 'test02' AND Password = 'test02'";
   $result = $conn->query($sql);

   $arr = array();
   while($row = mysqli_fetch_assoc($result)){
     $arr[] = $row;
   }

  echo json_encode($arr);

?>
