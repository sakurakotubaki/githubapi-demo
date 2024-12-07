'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import { SkillChart } from './components/SkillChart';
import { getSkillData } from './utils/github';

export default function Home() {
  const [skillData, setSkillData] = useState<{ language: string; percentage: number; grade: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkillData();
        setSkillData(data);
      } catch (err) {
        setError('Failed to fetch skill data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            GitHub Skill Visualization
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <>
                <SkillChart data={skillData} />
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Skill Grades</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillData.map((skill) => {
                      const colors = [
                        '#FF1E1E', '#FF4D00', '#FFD700', '#32CD32', '#00BFFF',
                        '#8A2BE2', '#FF69B4', '#FF6B6B', '#4CAF50', '#2196F3',
                        '#9C27B0', '#FF5722', '#009688', '#E91E63', '#3F51B5'
                      ];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      
                      return (
                        <div
                          key={skill.language}
                          className="p-4 rounded-lg text-white"
                          style={{ backgroundColor: randomColor }}
                        >
                          <h3 className="font-medium">{skill.language}</h3>
                          <div className="flex justify-between mt-2">
                            <span>Grade: {skill.grade}</span>
                            <span>{skill.percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
