/** Subset of GET /repos/{owner}/{repo} used by the portfolio. */
export interface GithubRepoMeta {
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  default_branch: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  private: boolean;
}

/** Portfolio-facing repo summary. */
export interface GithubRepository {
  /** Repo slug (`name` field). */
  name: string;
  /** Title from first `#` in README, else `name`. */
  title: string;
  description: string | null;
  /** `homepage` from GitHub (demo / website). */
  website: string | null;
  topics: string[];
  htmlUrl: string;
  defaultBranch: string;
  /** True when the GitHub repo is private — never expose repo CTA. */
  private: boolean;
  readme: string | null;
}
