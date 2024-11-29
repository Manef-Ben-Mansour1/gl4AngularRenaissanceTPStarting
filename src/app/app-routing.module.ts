import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
const routes: Route[] = [
  { path: "login", 
    loadComponent: () => import('./auth/login/login.component')
    .then(m => m.LoginComponent),
   },
  { path: "rh",
     loadComponent: () => import('./optimizationPattern/rh/rh.component')
     .then(m => m.RhComponent),},
     {
      path: "cv",
      loadChildren: () => import("./cv/lazy-cv-routes").then((m) => m.lazyCvRoutes),
    },
    {
      path: '',
      children: [
        {path: '',loadComponent: () => import('./templates/front/front.component').then(m => m.FrontComponent)},
        { path: 'todo', loadComponent: () => import('./todo/todo/todo.component').then(m => m.TodoComponent) },
        { path: 'word', loadComponent: () => import('./directives/mini-word/mini-word.component').then(m => m.MiniWordComponent) },
      ],
    },
  {
    path: "admin",
    children: [
      { path: 'color', loadComponent: () => import('./components/color/color.component').then(m => m.ColorComponent) },
    ],
  },
  { path: "**", 
    loadComponent: () => import('./components/nf404/nf404.component')
    .then(m => m.NF404Component),
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
