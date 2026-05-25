import React from 'react';
import { defineConfig, Studio, SchemaTypeDefinition } from 'sanity';
import { structureTool } from 'sanity/structure';
import { ArrowLeft } from 'lucide-react';

const metaEnv = (import.meta as any).env || {};
const projectId = metaEnv.VITE_SANITY_PROJECT_ID || 'r0fcgsmf';
const dataset = metaEnv.VITE_SANITY_DATASET || 'news';
const apiVersion = metaEnv.VITE_SANITY_API_VERSION || '2026-05-26';

// 1. Definition of the Activity Content Schema Type
const activitySchema: SchemaTypeDefinition = {
  name: 'activity',
  title: '대외활동 및 뉴스룸',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('제목은 필수 입력 사항입니다.'),
    },
    {
      name: 'period',
      title: '활동 기간 / 일자',
      type: 'string',
      description: '예: 2026-05-25 또는 2026년 상반기',
      validation: (Rule: any) => Rule.required().error('기간/일자는 필수 입력 사항입니다.'),
    },
    {
      name: 'excerpt',
      title: '요약글',
      type: 'text',
      description: '목록 카드형 뷰에 노출되는 간략한 요약 설명글입니다. (최대 150자 권장)',
      validation: (Rule: any) => Rule.required().max(200).error('요약글은 필수이며 최대 200자까지 가능합니다.'),
    },
    {
      name: 'coverImage',
      title: '대표 커버 이미지',
      type: 'image',
      options: {
        hotspot: true, // Enable crop and focal point selection
      },
    },
    {
      name: 'body',
      title: '상세 본문 내용',
      type: 'array',
      of: [{ type: 'block' }],
      description: '대외활동 상세 페이지에 표시될 서식 있는 텍스트 본문입니다.',
    },
    {
      name: 'published',
      title: '사이트 노출 여부',
      type: 'boolean',
      initialValue: true,
      description: '정식으로 저장하여 방문자 페이지에 실시간 노출시킬지 설정합니다.',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'period',
      media: 'coverImage',
    },
  },
};

// 2. Self-contained defineConfig configuration for embedded Sanity Studio
const config = defineConfig({
  name: 'sj-corporation-studio',
  title: 'SJ Corporation CMS Studio',
  projectId,
  dataset,
  basePath: '/studio', // Matches the SPA view route
  plugins: [structureTool()],
  schema: {
    types: [activitySchema],
  },
});

interface SanityStudioProps {
  onBack: () => void;
}

export const SanityStudio = ({ onBack }: SanityStudioProps) => {
  return (
    <div className="w-full min-h-screen bg-neutral-900 overflow-hidden relative">
      {/* Absolute top back controller (floating beautifully) */}
      <div className="absolute top-4 left-4 z-[9999]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-neutral-900/90 text-white hover:bg-emerald-600 transition-all font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl border border-white/10 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>메인 웹사이트로 돌아가기</span>
        </button>
      </div>

      {/* Embedded Sanity Studio */}
      <div className="w-full h-screen">
        <Studio config={config} />
      </div>
    </div>
  );
};
