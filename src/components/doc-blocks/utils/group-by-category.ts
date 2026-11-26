import { STACK_CATEGORIES, type StackCategory } from '../constants/node-kinds';
import type { StackItem } from '../schemas/doc-block-schemas';

export interface StackGroup {
  category: StackCategory;
  items: StackItem[];
}

/** Group items by category, keeping the canonical category order and skipping empty ones. */
export function groupByCategory(items: StackItem[]): StackGroup[] {
  return STACK_CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.category === category)
  })).filter((group) => group.items.length > 0);
}
