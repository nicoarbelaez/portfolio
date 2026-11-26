import { CV_VAULT_ROUTE } from '../constants/cv-vault';

/** `/cv` and everything below it; `/cvx` is not part of the vault. */
export function isCvVaultPath(pathname: string): boolean {
  return pathname === CV_VAULT_ROUTE || pathname.startsWith(`${CV_VAULT_ROUTE}/`);
}
