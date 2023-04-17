import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../interfaces/valid-roles';
import { RoleProtected } from './role-protected.decorator';
import { UserRolesGuard } from '../guards/user-roles/user-roles.guard';


export function Auth(...roles: ValidRoles[]) {

  return applyDecorators(
    RoleProtected(...roles), //para inyectar los roles permitidos
    UseGuards( AuthGuard(), UserRolesGuard ), // para inyectar los guards de autenticacion y autorizacion
  );

}