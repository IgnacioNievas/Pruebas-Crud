import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { ServeService } from '../../service/serve.service';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  constructor(private serve:ServeService ,  private rou:ActivatedRoute) { }
heroe:HeroeModel= new HeroeModel();
 
//para diferencia las rutas con parametro la de nuevo con la del heroe(se usa su id para eso)
ngOnInit() {
   const id = this.rou.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.serve.getHeroe(id).subscribe( (resp:HeroeModel)=>{
      this.heroe= resp;
      this.heroe.id= id; })

    }
  }
  //guarda y/o actualiza al hero siempre que sean valido
guardar(heroe:NgForm){
  if(heroe.invalid){
    return;
  }

  Swal.fire({
    title:'Espere por favor',
    text:'Guardando Informacion',
    icon:'info',
    allowOutsideClick:true,
  });

  Swal.showLoading();

  let peticion : Observable <any> ;

  if(this.heroe.id){
   peticion = this.serve.actualizarHeroe(this.heroe);
    }
  else{
  peticion = this.serve.setHeroe(this.heroe);
  }
  
peticion.subscribe(()=>{
  Swal.fire({
    title:this.heroe.name,
    text:'Se actualizo correctamente',
    icon:'success',
  });
});

} 
}
