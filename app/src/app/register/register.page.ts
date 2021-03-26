import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  RegisterData:any={};
  constructor(
    private router:Router,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public http: HttpClient,

    ){ 
      this.RegisterData.username="";
      this.RegisterData.pass1="";
      this.RegisterData.pass2="";
      this.RegisterData.names="";
      this.RegisterData.sex="";
      this.RegisterData.date="";
      this.RegisterData.pin="";
      this.RegisterData.check=false;
    }

  ngOnInit() {
  }
  async alert(text){
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  back(){
    this.router.navigate(['/home']);
  }

  register(event){
    this.prosesRegister();
  }

  async prosesRegister(){
    let pin=this.RegisterData.pin.length;
    if(this.RegisterData.username==''){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอกชื่อผู้ใช้',
        duration: 2000
    });
    toast.present();
    }
    else if(this.RegisterData.pass1==''){
      const toast = await this.toastCtrl.create({
          message: 'กรุณากรอกรหัสผ่าน',
          duration: 2000
      });
      toast.present();
    }
    else if(this.RegisterData.pass2==''){
      const toast = await this.toastCtrl.create({
          message: 'กรุณายืนยันรหัสผ่าน',
          duration: 2000
      });
      toast.present();
    }
    else if(this.RegisterData.pass1!=this.RegisterData.pass2){
      const toast = await this.toastCtrl.create({
          message: 'กรอกรหัสผ่านไม่ตรงกัน',
          duration: 2000
      });
      toast.present();
    }
    else if(this.RegisterData.names==''){
        const toast = await this.toastCtrl.create({
            message: 'กรุณากรอกชื่อ-นามสกุล',
            duration: 2000
        });
        toast.present();
    }
    else if(this.RegisterData.sex==''){
        const toast = await this.toastCtrl.create({
          message: 'เลือกเพศ',
          duration: 2000
      });
      toast.present();
    }
    else if(this.RegisterData.date==''){
        const toast = await this.toastCtrl.create({
          message: 'เลือกวันเดือนปีเกิด',
          duration: 2000
      });
      toast.present();
    }
    else if(pin<4){
        const toast = await this.toastCtrl.create({
          message: 'กรอก Pin ให้ครบ',
          duration: 2000
      });
      toast.present();
    }
    else if(this.RegisterData.check==false){
        const toast = await this.toastCtrl.create({
          message: 'กรุณายินยอมเงื่อนไข',
          duration: 2000
      });
      toast.present();
    }
    else{
        let url = "https://capital-cru.000webhostapp.com/project/insert.php";
        
        let postdataset = new FormData();
        postdataset.append('username', this.RegisterData.username);
        postdataset.append('passwords', this.RegisterData.pass2);
        postdataset.append('name', this.RegisterData.names);
        postdataset.append('sex', this.RegisterData.sex);
        postdataset.append('date', this.RegisterData.date);
        postdataset.append('pin', this.RegisterData.pin);
        

        let call:Observable<any> = this.http.post(url, postdataset);
        
        call.subscribe(calls =>{
          
        });
        this.alert("สมัครเสร็จสิ้น");
        this.router.navigate(['/home']);
    }
  }
}
