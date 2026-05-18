# 무존재 아이들 (No-Name Children)

인터랙티브 소설 웹앱 — 존재를 부정당한 아이들의 이야기.

---

## 1. Project Overview

《무존재 아이들》은 선형 인터랙티브 소설 웹앱이다. 독자는 각 씬에서 선택지를 고르며 이야기를 진행한다. 자유도 높은 분기 게임이 아닌, 정답 선택지를 찾아 다음 장면으로 넘어가는 문학형 퍼즐 구조다.

---

## 2. Core Concept

- 각 씬에는 선택지 3개(정답 1개, 오답 2개)가 있다.
- 정답을 선택해야 다음 씬으로 진행된다.
- 오답을 선택하면 해당 버튼이 비활성화되고, 담담한 반응 텍스트가 표시된다.
- 진행 상태는 localStorage에 자동 저장되며 이어하기가 가능하다.

---

## 3. Tech Stack

| 역할 | 기술 |
|---|---|
| 프레임워크 | React 18 + Vite |
| 언어 | TypeScript |
| 상태관리 | Zustand + persist middleware |
| 애니메이션 | Framer Motion |
| 스타일 | CSS Modules |
| PWA | vite-plugin-pwa |
| 배포 | Vercel |

---

## 4. Features

- JSON 기반 스토리 데이터 로딩 (코드와 콘텐츠 완전 분리)
- 오답 버튼 비활성화 + 단계별 피드백 텍스트
- 씬 진입 시 선택지 순서 랜덤 셔플 (씬 내에서 순서 고정)
- Framer Motion 페이드 씬 전환
- Zustand persist로 localStorage 저장 / 이어하기 지원
- 공개 데모 콘텐츠 / 비공개 원고 분리 구조
- PWA 기본 설정 (오프라인 준비)

---

## 5. Architecture

```
코드 (src/)          ←→         콘텐츠 (public/content/demo/)
엔진 / UI / Store         scenes.json (fetch로 런타임 로딩)
```

- `src/` 는 엔진과 UI만 담당한다. 스토리 텍스트는 포함하지 않는다.
- `public/content/demo/scenes.json` 은 배포 환경에서 `fetch()`로 읽힌다.
- `content/private/` 는 `.gitignore` 처리되어 GitHub에 올라가지 않는다.

---

## 6. Story Data Structure

```json
{
  "initialSceneId": "prologue_001",
  "scenes": [
    {
      "id": "prologue_001",
      "chapter": "프롤로그",
      "narrative": ["문단 1", "문단 2"],
      "image": "images/sample.webp",
      "choices": [
        {
          "id": "c1",
          "text": "정답 선택지",
          "isCorrect": true,
          "nextSceneId": "prologue_002",
          "wrongResponses": null
        },
        {
          "id": "c2",
          "text": "오답 선택지",
          "isCorrect": false,
          "wrongResponses": ["1차 반응", "2차 반응"]
        }
      ]
    }
  ]
}
```

---

## 7. Folder Structure

```
src/
├── components/         UI 컴포넌트 (+ CSS Modules)
├── store/              Zustand 게임 상태
├── types/              TypeScript 타입 정의
├── hooks/              useScenes (JSON 로딩)
├── utils/              shuffleChoices, getWrongResponse
├── styles/             global.css, tokens.css
├── App.tsx
└── main.tsx

public/
└── content/
    └── demo/
        └── scenes.json   ← 공개 데모 콘텐츠

content/
└── private/              ← .gitignore 처리 (실제 원고)
```

---

## 8. Local Development

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속.

---

## 9. Deployment

Vercel에 그대로 배포 가능하다. `public/content/demo/scenes.json` 은 정적 파일로 서빙된다.

```bash
npm run build
```

---

## 10. License

All story content and artwork are © 작가. All rights reserved.
Source code is private.

---

## 11. Roadmap

- [ ] 실제 원고 씬 추가 (`content/private/` → `public/content/demo/` 복사 후 배포)
- [ ] 씬별 이미지 삽화 추가
- [ ] 챕터 선택 화면
- [ ] 한국어 웹폰트 최적화 (서브셋)
- [ ] 다국어 지원 구조 검토
