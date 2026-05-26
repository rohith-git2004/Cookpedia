import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const toaster = inject(ToastrService)
  const router = inject(Router)
  if (sessionStorage.getItem("token")) {
    return true
  }
  else{
    toaster.warning("Unauthorized access Please login")
    router.navigateByUrl('/login')
    return false
  }
  return true;
};
