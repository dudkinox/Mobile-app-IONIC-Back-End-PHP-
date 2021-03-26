import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class HomePage {

  logindata:any = {};
  constructor(public navCtrl: NavController,
    public alertController: AlertController,
    public http: HttpClient,
    public router: Router,
    public toastCtrl: ToastController,
    public loadingController: LoadingController) {
        
        this.logindata.user = "";
        this.logindata.pass = "";
  }

  async pinAlertcheck(text) {
    const alert = await this.alertController.create({
      message: text,
      buttons: ['OK'] 
    });

    await alert.present();
  }

  async alertbox(text){
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  

login(){
    if(this.logindata.user != "" && this.logindata.pass != ""){
      let url:string = "https://capital-cru.000webhostapp.com/project/login.php";
     
      this.http.get(url).subscribe((data) => {
        console.log(data);
        let i=0;
        var count=Object.keys(data).length;
        while(i<count){
          if(this.logindata.user == data[i].ID && this.logindata.pass == data[i].Password){
            this.presentLoading();
            this.navCtrl.navigateForward(['/homepage', {
              ID: this.logindata.user,
              Password: this.logindata.pass
            }]);
            this.alertbox('เข้าสู่ระบบ');
            
            break;
          }
          else
          {
            i++;
          }
        }
        if(i-1==count){
          console.log('รหัสผิดพลาด');
          this.alertbox('รหัสผิดพลาด');
        }
      });
    }else{
      this.alertbox('กรอกข้อมูลให้ครบ');
    }
  }
  register(){
    this.router.navigate(['/register']);
  }

}
