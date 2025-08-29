// import { Component, inject } from '@angular/core';
// import { User } from '../../service/user';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.html',
//   styleUrl: './home.scss',
// })
// export class Home {
//   private readonly userService = inject(User);

//   ngOnInit(): void {
//     this.getAllUsers();
//   }

//   usersList: any[] = [];

//   getAllUsers() {
//     this.userService.getAllUsers().subscribe((response) => {
//       this.usersList = response?.data;
//     });
//   }
// }

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { User } from '../../service/user';
import { Loading } from '../../shared/service/loading';
import { AppConstants } from '../../util/AppConstants';

@Component({
  selector: 'app-home',
  imports: [NgxLoadingModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly userService = inject(User);
  private readonly toast = inject(ToastrService);
  public readonly loadingService = inject(Loading);

  ngOnInit(): void {
    this.loadRecords();
  }

  usersList: any[] = [];

  loadRecords() {
    this.loadingService.show();
    this.userService
      .getAllUsers()
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (response) => {
          if (response.success === AppConstants.SUCCESS_STATUS) {
            this.usersList = response.data;
            this.toast.success(response.message);
          }
        },
        error: () => {
          this.toast.error(AppConstants.TOAST_ERROR);
        },
      });
  }
}
