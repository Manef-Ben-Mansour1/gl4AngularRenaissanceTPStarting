
import { Route } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";

export const lazyCvRoutes: Route[] = [
  {
    path: "",
    loadComponent: () =>
      import("./cv/cv.component").then((m) => m.CvComponent),
  },
  {
    path: "add",
    loadComponent: () =>
      import("./add-cv/add-cv.component").then((m) => m.AddCvComponent),
    canActivate: [AuthGuard],
  },
  {
    path: ":id",
    loadComponent: () =>
      import("./details-cv/details-cv.component").then(
        (m) => m.DetailsCvComponent
      ),
  },
];
