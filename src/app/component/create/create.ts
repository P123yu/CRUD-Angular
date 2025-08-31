// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NgxLoadingModule } from 'ngx-loading';
// import { ToastrService } from 'ngx-toastr';
// import { finalize } from 'rxjs/operators';

// import { AsyncPipe } from '@angular/common';
// import { User } from '../../service/user';
// import { Cities } from '../../shared/service/cities';
// import { Loading } from '../../shared/service/loading';
// import { AppConstants } from '../../util/AppConstants';

// @Component({
//   selector: 'app-create',
//   standalone: true,
//   imports: [ReactiveFormsModule, NgxLoadingModule, AsyncPipe],
//   templateUrl: './create.html',
//   styleUrl: './create.scss',
// })
// export class Create {
//   private readonly fb = inject(FormBuilder);
//   private readonly userService = inject(User);
//   private readonly toast = inject(ToastrService);
//   public readonly loadingService = inject(Loading);
//   private readonly cityService = inject(Cities);

//   userForm = this.fb.nonNullable.group({
//     id: [''],
//     name: ['', Validators.required],
//     city: ['', Validators.required],
//     marks: ['', Validators.required],
//   });
//   AppConstants: any;

//   ngOnInit(): void {
//     this.loadRecords();
//   }

//   usersList: any[] = [];
//   editorType: string = AppConstants.CREATE;

//   selectedRecord: any;

//   cities: string[] = [];

//   loadCities() {
//     //  this.userService.getAllUsers().subscribe();
//     // this.cityService.cities$.subscribe((res) => {
//     //   this.cities = res;
//     //   console.log('Cities from service:', this.cities);
//     // });

//     this.cityService.cities$.subscribe((res) => {
//       this.cities = res;
//       console.log('Cities from service:', this.cities);
//     });
//   }

//   loadRecords() {
//     this.loadingService.show();
//     this.userService
//       .getAllUsers()
//       .pipe(finalize(() => this.loadingService.hide()))
//       .subscribe({
//         next: (response) => {
//           if (response.success === AppConstants.SUCCESS_STATUS) {
//             this.usersList = response?.data;
//             this.loadCities();
//           }
//         },
//         error: () => {
//           this.toast.error(AppConstants.TOAST_ERROR);
//         },
//       });
//   }

//   onEditClick(value: any) {
//     this.userForm.patchValue(value);
//     this.editorType = AppConstants.UPDATE;
//   }

//   onClearClick() {
//     this.userForm.reset();
//     this.editorType = AppConstants.CREATE;
//   }

//   onDeleteClick(id: any) {
//     this.userService.deleteUser(id).subscribe({
//       next: (response) => {
//         if (response.success == AppConstants.SUCCESS_STATUS) {
//           const index = this.usersList.findIndex((user) => user.id === id);
//           this.usersList = this.usersList.filter((_, i) => i !== index);
//           this.userForm.reset();
//           if (response.message) {
//             this.toast.success(response.message);
//           }
//         }
//       },
//       error: (err) => {
//         console.error('Error loading template:', err);
//       },
//     });
//   }

//   onSaveClick() {
//     if (this.userForm.valid) {
//       const data = this.userForm.value;
//       if (!data?.id) {
//         this.loadingService.show();
//         this.userService
//           .createUser(data)
//           .pipe(finalize(() => this.loadingService.hide()))
//           .subscribe({
//             next: (response) => {
//               if (response.success === AppConstants.SUCCESS_STATUS) {
//                 this.userForm.reset();
//                 if (response.message) {
//                   this.toast.success(response.message);
//                   this.loadRecords();
//                 }
//               } else {
//                 this.toast.error(AppConstants.TOAST_ERROR);
//               }
//             },
//             error: () => {
//               this.toast.error('Something went wrong.');
//             },
//           });
//       } else {
//         this.userService.updateUser(data).subscribe({
//           next: (response) => {
//             if (response.success === AppConstants.SUCCESS_STATUS) {
//               const updatedUser = response.data;
//               const index = this.usersList.findIndex((user) => user.id === updatedUser.id);
//               if (index !== -1) {
//                 this.usersList[index] = updatedUser;
//               }
//               this.userForm.reset();
//               this.editorType = AppConstants.CREATE;
//               if (response.message) {
//                 this.toast.success(response.message);
//               }
//             }
//           },
//           error: (err) => {
//             console.error('Error loading template:', err);
//           },
//         });
//       }
//     }
//   }
// }

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

import { AsyncPipe, CommonModule } from '@angular/common';
import { format, isValid, parse } from 'date-fns';
import { User } from '../../service/user';
import { Cities } from '../../shared/service/cities';
import { Loading } from '../../shared/service/loading';
import { AppConstants } from '../../util/AppConstants';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgxLoadingModule, AsyncPipe, CommonModule],
  templateUrl: './create.html',
  styleUrls: ['./create.scss'],
})
export class Create {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(User);
  private readonly toast = inject(ToastrService);
  public readonly loadingService = inject(Loading);
  private readonly cityService = inject(Cities);

  // Reactive Form
  userForm = this.fb.nonNullable.group({
    id: [''],
    name: ['', Validators.required],
    city: ['', Validators.required],
    marks: ['', Validators.required],
    file: [null], // File will be stored here
    date: ['', Validators.required],
  });

  AppConstants: any;

  usersList: any[] = [];
  editorType: string = AppConstants.CREATE;
  selectedRecord: any;
  cities: string[] = [];

  ngOnInit(): void {
    this.loadRecords();
  }

  // Load city list
  loadCities() {
    this.cityService.cities$.subscribe((res) => {
      this.cities = res;
      console.log('Cities from service:', this.cities);
    });
  }

  // Load users
  loadRecords() {
    this.loadingService.show();
    this.userService
      .getAllUsers()
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (response) => {
          if (response.success === AppConstants.SUCCESS_STATUS) {
            this.usersList = response?.data;
            this.loadCities();
          }
        },
        error: () => {
          this.toast.error(AppConstants.TOAST_ERROR);
        },
      });
  }

  // File input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ file: file });
    }
  }

//  // simple without date and file
//   onEditClick(value: any) {
//     this.userForm.patchValue(value);
//     }
//     this.editorType = AppConstants.UPDATE;
//   }

  onEditClick(value: any) {
    this.userForm.patchValue(value);

    if (value.date) {
      // Parse backend date string "dd-MM-yyyy"
      const parsed = parse(value.date, 'dd-MM-yyyy', new Date());

      if (isValid(parsed)) {
        // Format into yyyy-MM-dd so input[type="date"] can display it
        this.userForm.patchValue({ date: format(parsed, 'yyyy-MM-dd') });
      } else {
        this.userForm.patchValue({ date: '' });
      }
    } else {
      this.userForm.patchValue({ date: '' });
    }

    this.userForm.patchValue({ file: null }); // reset file input
    this.editorType = AppConstants.UPDATE;
  }

  // Clear form
  onClearClick() {
    this.userForm.reset();
    this.editorType = AppConstants.CREATE;
  }

  // Delete user
  onDeleteClick(id: any) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        if (response.success == AppConstants.SUCCESS_STATUS) {
          const index = this.usersList.findIndex((user) => user.id === id);
          this.usersList = this.usersList.filter((_, i) => i !== index);
          this.userForm.reset();
          if (response.message) {
            this.toast.success(response.message);
          }
        }
      },
      error: (err) => {
        console.error('Error loading template:', err);
      },
    });
  }

  // Convert form value to FormData
  private toFormData(formValue: any): FormData {
    const formData = new FormData();
    Object.keys(formValue).forEach((key) => {
      if (formValue[key] !== null && formValue[key] !== undefined) {
        formData.append(key, formValue[key]);
      }
    });
    return formData;
  }

  // Save user
  onSaveClick() {
    if (this.userForm.valid) {
      const data = this.userForm.value;
      const formData = this.toFormData(data);

      if (!data.id) {
        // Create
        this.loadingService.show();
        this.userService
          .createUser(formData)
          .pipe(finalize(() => this.loadingService.hide()))
          .subscribe({
            next: (response) => {
              if (response.success === AppConstants.SUCCESS_STATUS) {
                this.userForm.reset();
                if (response.message) {
                  this.toast.success(response.message);
                  this.loadRecords();
                }
              } else {
                this.toast.error(AppConstants.TOAST_ERROR);
              }
            },
            error: () => {
              this.toast.error('Something went wrong.');
            },
          });
      } else {
        // Update
        this.userService.updateUser(formData).subscribe({
          next: (response) => {
            if (response.success === AppConstants.SUCCESS_STATUS) {
              const updatedUser = response.data;
              const index = this.usersList.findIndex((user) => user.id === updatedUser.id);
              if (index !== -1) {
                this.usersList[index] = updatedUser;
              }
              this.userForm.reset();
              this.editorType = AppConstants.CREATE;
              if (response.message) {
                this.toast.success(response.message);
              }
            }
          },
          error: (err) => {
            console.error('Error loading template:', err);
          },
        });
      }
    }
  }
}
