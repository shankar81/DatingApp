import { CanActivateFn } from '@angular/router';

export const preventUnsavedChangesGuard: CanActivateFn = (route, state) => {
  // @ts-ignore
  if (route.editForm.dirty) {
    return confirm('Are u sure?');
  }
  return true;
};
