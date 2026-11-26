/** One line of a parsed folder tree. */
export interface FolderTreeEntry {
  name: string;
  depth: number;
  isDirectory: boolean;
  description?: string;
}

const COMMENT_MARKER = '#';
const DIRECTORY_SUFFIX = '/';
const TAB_AS_SPACES = '  ';

/**
 * Parse an indented string into flat entries. Depth comes from indentation
 * (the smallest non-zero indent is one level); `#` starts a description;
 * a trailing `/` marks a directory, as does having children.
 */
export function parseFolderTree(tree: string): FolderTreeEntry[] {
  const rows = tree
    .replace(/\t/g, TAB_AS_SPACES)
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const indent = line.length - line.trimStart().length;
      const body = line.trim();
      const markerAt = body.indexOf(COMMENT_MARKER);
      const rawName = (markerAt === -1 ? body : body.slice(0, markerAt)).trim();
      const description = markerAt === -1 ? '' : body.slice(markerAt + 1).trim();
      return { indent, rawName, description };
    })
    .filter((row) => row.rawName.length > 0);

  const indents = rows.map((row) => row.indent).filter((indent) => indent > 0);
  const indentUnit = indents.length > 0 ? Math.min(...indents) : 1;

  return rows.map((row, index) => {
    const next = rows[index + 1];
    const hasChildren = next !== undefined && next.indent > row.indent;
    return {
      name: row.rawName,
      depth: Math.round(row.indent / indentUnit),
      isDirectory: row.rawName.endsWith(DIRECTORY_SUFFIX) || hasChildren,
      description: row.description || undefined
    };
  });
}
