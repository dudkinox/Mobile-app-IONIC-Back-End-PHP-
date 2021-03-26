<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include('connect.ini.php');

   $sql = "SELECT * FROM login";
   $result = mysqli_query($conn,$sql);

   $numrow = mysqli_num_rows($result);

  if($numrow > 0){
       $arr = array();
       while($row = mysqli_fetch_assoc($result)){
         $arr[] = $row;
       }

      echo json_encode($arr);
  }else{
      echo "null";
  }


?>