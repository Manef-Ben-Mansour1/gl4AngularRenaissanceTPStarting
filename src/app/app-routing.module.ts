import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { CvResolver } from "./cv/cv/cv-resolver.service";
import { MyPreloadingStrategy } from "./my-preloading-strategy.service";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },
  {
    path: "cv",
    resolve: {
      cvs: CvResolver
    },
    loadChildren: () => import('./cv/cv.module').then(m => m.CvModule),
    data: { preload: true }
  },
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule), },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: MyPreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
