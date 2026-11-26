/** A metric string split into a countable number and its decoration. */
export interface ParsedMetricValue {
  prefix: string;
  suffix: string;
  value: number;
  decimals: number;
  /** Thousands separator found in the source, or empty. */
  groupSeparator: string;
  /** Decimal separator found in the source, or empty. */
  decimalSeparator: string;
}

const METRIC_PATTERN = /^(\D*?)(\d[\d.,]*\d|\d)(.*)$/s;
const GROUPED_PATTERN = /^\d{1,3}([.,]\d{3})+$/;
const SEPARATOR_PATTERN = /[.,]/;
const GROUP_BOUNDARY_PATTERN = /\B(?=(\d{3})+(?!\d))/g;

/**
 * Split strings such as `+490`, `69%`, `$29.974.400` or `USD 158` into
 * prefix / number / suffix so the number can be animated.
 * @returns `null` when the string has no digits.
 */
export function parseMetricValue(raw: string): ParsedMetricValue | null {
  const match = METRIC_PATTERN.exec(raw.trim());
  if (!match) return null;
  const [, prefix, digits, suffix] = match;

  if (GROUPED_PATTERN.test(digits)) {
    const groupSeparator = digits.includes('.') ? '.' : ',';
    return {
      prefix,
      suffix,
      value: Number(digits.split(groupSeparator).join('')),
      decimals: 0,
      groupSeparator,
      decimalSeparator: ''
    };
  }

  const separator = SEPARATOR_PATTERN.exec(digits)?.[0];
  if (separator && digits.split(separator).length === 2) {
    return {
      prefix,
      suffix,
      value: Number(digits.replace(separator, '.')),
      decimals: digits.split(separator)[1].length,
      groupSeparator: '',
      decimalSeparator: separator
    };
  }

  return {
    prefix,
    suffix,
    value: Number(digits.replace(/[.,]/g, '')),
    decimals: 0,
    groupSeparator: '',
    decimalSeparator: ''
  };
}

/** Render a number with the separators of the parsed source. */
export function formatMetricNumber(value: number, parsed: ParsedMetricValue): string {
  const [integer, fraction] = Math.abs(value).toFixed(parsed.decimals).split('.');
  const grouped = parsed.groupSeparator
    ? integer.replace(GROUP_BOUNDARY_PATTERN, parsed.groupSeparator)
    : integer;
  return fraction ? `${grouped}${parsed.decimalSeparator}${fraction}` : grouped;
}
