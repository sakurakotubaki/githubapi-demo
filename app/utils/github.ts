import { octokit, username } from '../config/github';

interface LanguageStats {
  [key: string]: number;
}

interface SkillData {
  language: string;
  percentage: number;
  grade: string;
}

const calculateGrade = (percentage: number): string => {
  if (percentage >= 40) return 'A';
  if (percentage >= 30) return 'B';
  if (percentage >= 20) return 'C';
  if (percentage >= 10) return 'D';
  return 'E';
};

export const getSkillData = async (): Promise<SkillData[]> => {
  try {
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
    });

    const languagePromises = repos.map(repo =>
      octokit.rest.repos.listLanguages({
        owner: username,
        repo: repo.name,
      })
    );

    const languageResponses = await Promise.all(languagePromises);
    
    const totalLanguages: LanguageStats = {};
    let totalBytes = 0;

    languageResponses.forEach(({ data }) => {
      Object.entries(data).forEach(([language, bytes]) => {
        totalLanguages[language] = (totalLanguages[language] || 0) + bytes;
        totalBytes += bytes;
      });
    });

    const skillData: SkillData[] = Object.entries(totalLanguages)
      .map(([language, bytes]) => ({
        language,
        percentage: Math.round((bytes / totalBytes) * 100),
        grade: calculateGrade((bytes / totalBytes) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10);

    return skillData;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
};
