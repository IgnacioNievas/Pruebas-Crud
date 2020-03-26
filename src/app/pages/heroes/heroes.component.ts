import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { ServeService } from '../../service/serve.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
heroes: HeroeModel[]=[];
cargando:boolean;
  constructor(private serve:ServeService) {  
  }
// para que me carge en el ngoninitn la funcion de getheroes
  ngOnInit() {
    this.cargando=true;
    this.serve.getHeroes().subscribe(resp =>{ this.heroes = resp;  this.cargando=false})
  }

  // metedo para borrar al hereo con cartel de consulta
borrarHer(heroes: HeroeModel, i:number){
  Swal.fire({
    title:'¿Esta seguro que lo quiere borrar?',
    text:`En verdad desea borrar a ${heroes.name}` ,
    icon:'question',
    showConfirmButton:true,
    showCancelButton:true,
  }).then(resp=>{
if (resp.value){
this.heroes.splice(i,1);
  this.serve.deleteHeroe(heroes.id).subscribe()
}})}

}
