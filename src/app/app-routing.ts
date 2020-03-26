import { Routes,RouterModule } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    {path:'heroes',component: HeroesComponent},
    {path:'heroe/:id', component:HeroeComponent},
    {path:'**',pathMatch:'full',redirectTo:'heroes'},
    {path:'',pathMatch:'full', redirectTo:'heroes'}

]
@NgModule({
    imports:[RouterModule.forRoot(ROUTES)],
    exports:[RouterModule]}
)
export class APP_ROUTING {}