import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import{map} from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class ServeService {
private url='https://app1-48d30.firebaseio.com'
  constructor(private http:HttpClient) { }

 //peticion http post envia los datos del heroe para hacer la base de datos

  setHeroe(heroe:HeroeModel){
return this.http.post(`${this.url}/heroes.json`,heroe).pipe(map ( (resp:any)=>{
heroe.id= resp.name;
return heroe;
}))
  }
//peticion http put , esta para actualizar los datos del heroe
  actualizarHeroe(heroe:HeroeModel){
    const her={
      ...heroe
    }
    delete her.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,her);
  }
   //peticion http get me trae un heroe de la base de datos segun su id
   //el map returna lo que este en heroeArr
 getHeroes(){
   return this.http.get(`${this.url}/heroes.json`).pipe(map(this.heroeArr))

 }
 
 getHeroe(id:string){
  return this.http.get(`${this.url}/heroes/${id}.json`)
 }
  //creo el arreglo del heroe 
 private heroeArr(heroeObj:object){
  const heroes:HeroeModel[]=[];
  if(heroeObj === null){return[];}
  Object.keys(heroeObj).forEach( key=>{
    const heroe:HeroeModel = heroeObj[key];
    heroe.id = key;
    heroes.push(heroe);
    
  })
  return heroes;
 
  }
  //peticion http delete que borrar al el id (el heroe)

  deleteHeroe(id:string){
return this.http.delete(`${this.url}/heroes/${id}.json`)
  }
}
