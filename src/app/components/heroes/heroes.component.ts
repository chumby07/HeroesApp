import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:any[] = [];
  loading:boolean = true;

  constructor(private service:HeroesService) {

    this.service.getHeroes().subscribe(
      res => {
        setTimeout(() => {
          this.heroes = res;
          this.loading = false;
        }, 2000);
      }
    )

  }

  ngOnInit() {
  }

  borrarHeroe( key$:string ){

    this.service.borrarHeroeService( key$ ).subscribe(
      res => {
        if(res){
          console.error(res);
        }else{
          delete this.heroes[key$];
        }
      }
    )

  }

}
