import { Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  ID:string;
  Password:string;
  name:string;
  photo:string;
  theme:string;
  public check:boolean;

  constructor(
    private menu: MenuController,
    public loadingController: LoadingController,
    public router: Router,
    private renderer: Renderer2,
    public http: HttpClient,
    public NavController: NavController,
    public Route: ActivatedRoute) 
    {
      
      
    }

    onToggleColorTheme(event) {
      let url = "https://capital-cru.000webhostapp.com/project/insert_setting.php";
        let postdataset = new FormData();
        let on=0;
        postdataset.append('ID', this.ID);
        
        let call:Observable<any> = this.http.post(url, postdataset);

          if (event.detail.checked) {
            this.renderer.setAttribute(document.body, 'color-theme', 'dark');
            postdataset.append('theme', "1");
          }
          else{
            this.renderer.setAttribute(document.body, 'color-theme', 'light');
            postdataset.append('theme', "0");
            
          }
          call.subscribe(calls =>{
          });
        }

  ngOnInit() {
    let url:string = "https://capital-cru.000webhostapp.com/project/setting.php";
      this.http.get(url).subscribe((data) => {
        
        
        if (data[0].theme=='0') {
          this.renderer.setAttribute(document.body, 'color-theme', 'light');
          this.check = false;
          
        }else{
          this.renderer.setAttribute(document.body, 'color-theme', 'dark');
          this.check = true;
        }
     });
    this.ID=this.Route.snapshot.paramMap.get('ID');
    this.Password=this.Route.snapshot.paramMap.get('Password');
    let search:string = "https://capital-cru.000webhostapp.com/project/login.php";
    
      this.http.get(search).subscribe((data) => {
      let i=0;
      var count=Object.keys(data).length;
      while(i<count){ 
        if(this.ID==data[i].ID && this.Password==data[i].Password){
            let sex = data[i].Sex;
            this.name=data[i].Name;
            if(sex=='boy'){
              this.photo="https://img.icons8.com/dusk/40/000000/checked-user-male.png";
            }
            else{
              this.photo="https://img.icons8.com/dusk/40/000000/checked-user-female.png";       
           }
           break;
        }
        else{
          i++;
        }
      }
    });
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

openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

openEnd() {
    this.menu.open('end');
  }

quit(){
    this.presentLoading();
    this.router.navigate(['/home']);
    }
  
    
}
