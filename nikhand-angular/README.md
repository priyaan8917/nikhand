# CSS connection — read this first

Open nikhand-preview.html directly in your browser to see the full design. Its CSS is embedded, so no stylesheet installation is required for the preview. It does not send enquiries.

For the Angular page, keep all three landing.component files together in src/app/landing/. Use the provided landing.component.ts — it connects the HTML and CSS using templateUrl and styleUrls. Do not paste Angular component HTML directly into index.html; that does not load its scoped CSS or Angular form logic.

The CSS is complete and does not depend on Bootstrap. Include every line of landing.component.css. Restart ng serve after copying the files. If the existing project has a conflicting rule, send a screenshot and the existing page/component files so it can be checked in that project.

# Nikhand Angular landing page — step by step

The public website was inspected on 30 September 2026. Its app-root reports Angular 18.2.13. The page loads Bootstrap 5.2.3 and Font Awesome 6.7.2. Its backend/database technology cannot be confirmed from public HTML.

## 1. Add the component
Copy landing.component.ts, landing.component.html and landing.component.css into src/app/landing/ in the existing Angular project. This is a standalone Angular 18 component, with scoped CSS. It uses Angular Reactive Forms and does not need React, jQuery or additional UI packages. Keep the existing Bootstrap styles.

## 2. Add a route
Add this entry to the existing routes array in app.routes.ts (do not replace other routes):

```ts
import { Routes } from '@angular/router';
export const routes: Routes = [
  // existing routes...
  { path: 'property-enquiry', loadComponent: () =>
      import('./landing/landing.component').then(m => m.LandingComponent) }
];
```
If an existing wildcard route is present, place this entry before the wildcard. Ensure your app already displays a router-outlet. Visit /property-enquiry.

Alternatively import LandingComponent into an existing standalone page's imports array and add:
```html
<app-landing [enquiryEndpoint]="'/YOUR-CONFIRMED-API-ROUTE'"></app-landing>
```
If the app uses NgModules, import this standalone component into the module's imports array (not declarations).

## 3. Connect the existing enquiry API
Set enquiryEndpoint in the component to your real backend POST route, or supply it via the input above. It defaults to empty deliberately: no request will be sent and no fake success message appears without a configured endpoint.

Expected JSON request:
```json
{"name":"Visitor name","phone":"9876543210","email":"visitor@example.com","city":"Chennai, OMR","propertyType":"Apartment","budget":"₹50 lakh – ₹1 crore","requirements":"2 BHK","consent":true}
```
Expected response, only after storing/delivering the enquiry:
```json
{"success":true}
```
The existing backend must validate all fields, enforce consent, rate-limit abuse, and store/deliver enquiries securely. If the existing API uses a different response shape or an Angular service/CSRF token, adapt submit() to the existing service. fetch does not automatically apply Angular HttpClient interceptors. No inbox, database or CRM is configured in this package.

## 4. Run and build
Use the project's existing package manager and lockfile:
```sh
npm install
npx ng serve
npx ng build
```
No package.json is supplied because this component belongs inside your existing project; retain the existing Angular dependencies. Public property imagery and the logo use URLs observed on Nikhand. For production, copy authorised assets into the project's assets directory and update their paths.

## 5. Check before going live
Check desktop and mobile, keyboard navigation, invalid phone/email, consent, successful API submission and failed/timeout requests. The frontend retains entered values on failure and prevents repeated submissions while sending. No property prices, unverifiable testimonials or approval claims were invented.

A backend integration test and Angular build must be run in your existing repository. That repository and API are not available in this session, so this package has not been compiled against them.
