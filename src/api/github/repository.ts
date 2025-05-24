import { apiHandler } from '@/api/handler';
import type { GitHubRepo } from '@/types/github';

const GITHUB_API_URL = 'https://api.github.com/repos';

export async function getRepository(owner: string, repo: string): Promise<GitHubRepo> {
  const endpoint = `${GITHUB_API_URL}/${owner}/${repo}`;

  try {
    return await apiHandler<GitHubRepo>(endpoint, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching GitHub repository: ${error.message}`);
    }
    throw error;
  }
}
