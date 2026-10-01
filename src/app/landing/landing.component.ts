import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing', standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing.component.html', styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  // Set this to your existing backend route. No enquiry is sent until configured.
  @Input() enquiryEndpoint = '';
  busy = false; submitted = false; message = ''; success = false;
  categories = ['Apartment', 'Villa', 'Residential plot', 'Commercial property'];
  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.email, Validators.maxLength(254)]],
    city: ['', [Validators.required, Validators.maxLength(80)]],
    propertyType: ['Apartment', Validators.required],
    budget: ['', Validators.required],
    requirements: ['', Validators.maxLength(1000)],
    consent: [false, Validators.requiredTrue]
  });
  invalid(name: keyof typeof this.form.controls): boolean {
    const field = this.form.controls[name]; return field.invalid && (field.touched || this.submitted);
  }
  choose(type: string): void {
    this.form.controls.propertyType.setValue(type);
    document.getElementById('enquiry')?.scrollIntoView({behavior: 'smooth'});
  }
  async submit(): Promise<void> {
    if (this.busy) return;
    this.submitted = true; this.success = false; this.message = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); this.message = 'Please check the highlighted fields.'; return; }
    if (!this.enquiryEndpoint.trim()) { this.message = 'Online enquiries are not available yet. Please visit Nikhand.in to contact the team.'; return; }
    this.busy = true;
    try {
      const response = await fetch(this.enquiryEndpoint, {
        method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.form.getRawValue()), signal: AbortSignal.timeout(20000)
      });
      const data = await response.json().catch(() => null);
      // The backend must confirm it has stored or delivered the enquiry.
      if (!response.ok || data?.success !== true) throw new Error('Submission failed');
      this.success = true; this.message = 'Thank you. Your enquiry has been received.';
      this.form.reset({name:'',phone:'',email:'',city:'',propertyType:'Apartment',budget:'',requirements:'',consent:false});
      this.submitted = false;
    } catch { this.message = 'We could not confirm your enquiry. Your details are still here. Please try again or contact Nikhand directly.'; }
    finally { this.busy = false; }
  }
}
