import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LinksComponent } from './links/links.component';
import { LinkCreationComponent } from './link-creation/link-creation.component';
import { LinkAnalyticsComponent } from './link-analytics/link-analytics.component';
import { AnalyticsViewComponent } from './analytics-view/analytics-view.component';


export const routes: Routes = [
    {
        path: 'home',
        component: LayoutComponent, // The layout component containing navbar, sidebar, etc.
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'links',
                component: LinksComponent
            },

            {
                path: 'link-creation',
                component: LinkCreationComponent
            },
            {
                path: 'link-analytics',
                component: LinkAnalyticsComponent
            },
            {
                path: 'link-analytics/:link_id',
                component: AnalyticsViewComponent
            },
        ]
    },
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    { path: '**', redirectTo: '/auth/login' }  // Wildcard route
];