import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel"
  }

  nuevo:boolean = false;
  id:string;

  constructor( private service:HeroesService, private router:Router, private active:ActivatedRoute ) {

    this.active.params.subscribe(
      parametros =>{
        console.log(parametros);
        this.id = parametros['id'];
        if( this.id != "nuevo" ){

          this.service.getHeroe( this.id ).subscribe(
            heroe => this.heroe = heroe
          )

        }
      }
    )

  }

  ngOnInit() {
  }

  guardar(){

    if( this.id == "nuevo" ){
      console.log(this.heroe);
      this.service.nuevoHeroe( this.heroe ).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/heroe', res.name]);
        }
      )
    }else{
      console.log(this.heroe);
      this.service.actualizarHeroe( this.heroe, this.id ).subscribe(
        res => {
          console.log(res);
        }
      )
    }

  }

  agregarNuevo( forma:NgForm ){

    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa:""
    });

  }

}
