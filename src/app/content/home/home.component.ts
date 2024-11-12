import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BannerComponent } from "../../landpage/banner/banner.component";
import { AboutComponent } from "../../landpage/about/about.component";
import { TypeServiceComponent } from "../../landpage/type-service/type-service.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule, BannerComponent, AboutComponent, TypeServiceComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
