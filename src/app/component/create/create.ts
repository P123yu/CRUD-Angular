// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { User } from '../../service/user';
// import { AppConstants } from '../../util/AppConstants';

// @Component({
//   selector: 'app-create',
//   imports: [ReactiveFormsModule],
//   templateUrl: './create.html',
//   styleUrl: './create.scss',
// })
// export class Create {
//   private readonly fb = inject(FormBuilder);
//   private readonly userService = inject(User);
//   private toast = inject(ToastrService);

//   userForm = this.fb.nonNullable.group({
//     id: [''],
//     name: ['', Validators.required],
//     city: ['', Validators.required],
//     marks: ['', Validators.required],
//   });

//   ngOnInit(): void {}

//   onSaveClick(): void {
//     if (this.userForm.valid) {
//       const data = this.userForm.value;
//       if (!data?.id) {
//         this.userService.createUser(data).subscribe({
//           next: (response) => {
//             if (response.success == AppConstants.SUCCESS_STATUS) {
//               this.userForm.reset();
//               if (response.message) {
//                 this.toast.success(response.message);
//               }
//             } else {
//               this.toast.error(AppConstants.TOAST_ERROR);
//             }
//           },
//         });
//       }
//     }
//   }
// }

// with loader

// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NgxLoadingModule } from 'ngx-loading';
// import { ToastrService } from 'ngx-toastr';
// import { finalize } from 'rxjs/operators';

// import { AsyncPipe } from '@angular/common';
// import { User } from '../../service/user';
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

//   userForm = this.fb.nonNullable.group({
//     id: [''],
//     name: ['', Validators.required],
//     city: ['', Validators.required],
//     marks: ['', Validators.required],
//   });

//   ngOnInit(): void {
//     this.loadRecords();
//   }

//   usersList: any[] = [];

//   loadRecords() {
//     this.loadingService.show();
//     this.userService
//       .getAllUsers()
//       .pipe(finalize(() => this.loadingService.hide()))
//       .subscribe({
//         next: (response) => {
//           console.log(response?.data);
//           if (response.success === AppConstants.SUCCESS_STATUS) {
//             console.log(response?.data, '90');
//             this.usersList = response?.data;
//             console.log(response?.data);
//             console.log(this.usersList);
//             this.toast.success(response.message);
//           }
//         },
//         error: () => {
//           this.toast.error(AppConstants.TOAST_ERROR);
//         },
//       });
//   }

//   onSaveClick(): void {
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
//       }
//     } else {
//       this.toast.warning('Please fill all required fields');
//     }
//   }
// }

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
import { User } from '../../service/user';
import { Loading } from '../../shared/service/loading';
import { AppConstants } from '../../util/AppConstants';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgxLoadingModule, AsyncPipe],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(User);
  private readonly toast = inject(ToastrService);
  public readonly loadingService = inject(Loading);

  userForm = this.fb.nonNullable.group({
    id: [''],
    name: ['', Validators.required],
    city: ['', Validators.required],
    marks: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadRecords(); 
  }

  usersList: any[] = [];
  editorType: string = AppConstants.CREATE;

  selectedRecord: any;

  loadRecords() {
    this.loadingService.show();
    this.userService
      .getAllUsers()
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (response) => {
          console.log(response?.data);
          if (response.success === AppConstants.SUCCESS_STATUS) {
            console.log(response?.data, '90');
            this.usersList = response?.data;
            console.log(response?.data);
            console.log(this.usersList);
            this.toast.success(response.message);
          }
        },
        error: () => {
          this.toast.error(AppConstants.TOAST_ERROR);
        },
      });
  }

  onEditClick(value: any): void {
    this.userForm.patchValue(value);
    this.editorType = AppConstants.UPDATE;
  }

  onSaveClick(): void {
    if (this.userForm.valid) {
      const data = this.userForm.value;
      if (!data?.id) {
        this.loadingService.show();
        this.userService
          .createUser(data)
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
        this.userService.updateUser(data).subscribe({
          next: (response) => {
            if (response.success === AppConstants.SUCCESS_STATUS) {
              const updatedUser = response.data;
              const index = this.usersList.findIndex((user) => user.id === updatedUser.id);
              if (index !== -1) {
                this.usersList[index] = updatedUser;
              }
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
    }
  }
}
