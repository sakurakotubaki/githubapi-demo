import { Octokit } from 'octokit';

export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

export const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'your-username';
