import { Post, Category, Tag } from '../types';

export const posts: Post[] = [
  {
    id: '1',
    title: '极简主义设计的艺术',
    excerpt: '探索极简主义设计如何在现代网页设计中创造优雅与功能的完美平衡。少即是多，留白是最好的装饰。',
    content: `
# 极简主义设计的艺术

极简主义设计不仅仅是一种视觉风格，更是一种设计哲学。它强调去除一切不必要的元素，只保留最核心的内容。

## 核心原则

1. **少即是多** - 每一个元素都应该有其存在的意义
2. **留白的力量** - 空白空间不是浪费，而是设计的一部分
3. **清晰的层次** - 通过排版和间距建立视觉层次

## 实践建议

在网页设计中实践极简主义：

- 限制色彩数量，通常不超过3种主色
- 使用充足的留白，让内容呼吸
- 选择简洁的字体，避免过多字体组合
- 简化导航，只保留必要的选项

## 结语

极简主义不是简单，而是精简。它需要设计师有更强的控制力，在有限的元素中创造无限的可能。
    `,
    date: '2024-03-15',
    readTime: 5,
    tags: ['设计', '极简主义', 'UI'],
    category: '设计'
  },
  {
    id: '2',
    title: 'React性能优化实践指南',
    excerpt: '深入探讨React应用的性能优化策略，从组件渲染到状态管理，全面提升应用性能。',
    content: `
# React性能优化实践指南

性能优化是每个前端开发者必须面对的课题。本文将介绍几种实用的React性能优化技巧。

## 1. 使用React.memo

React.memo是一个高阶组件，用于避免不必要的重新渲染：

\`\`\`jsx
const MyComponent = React.memo(function MyComponent(props) {
  // 组件逻辑
});
\`\`\`

## 2. 合理使用useMemo和useCallback

这两个Hook可以帮助我们缓存计算结果和函数引用：

\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);
\`\`\`

## 3. 代码分割

使用React.lazy和Suspense实现组件级别的代码分割：

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## 结语

性能优化是一个持续的过程，需要在实际项目中不断实践和调整。
    `,
    date: '2024-03-10',
    readTime: 8,
    tags: ['React', '性能优化', '前端'],
    category: '技术'
  },
  {
    id: '3',
    title: 'TypeScript类型体操入门',
    excerpt: '从基础到进阶，系统学习TypeScript的高级类型操作，让你的类型定义更加精准和灵活。',
    content: `
# TypeScript类型体操入门

TypeScript的类型系统非常强大，掌握高级类型操作可以让你的代码更加健壮。

## 基础类型操作

### 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

### 映射类型

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
\`\`\`

## 实用工具类型

TypeScript内置了许多实用的工具类型：

- \`Partial<T>\` - 将所有属性变为可选
- \`Required<T>\` - 将所有属性变为必选
- \`Pick<T, K>\` - 选取指定属性
- \`Omit<T, K>\` - 排除指定属性

## 结语

类型体操需要大量练习，建议从实际项目需求出发，逐步掌握各种技巧。
    `,
    date: '2024-03-05',
    readTime: 6,
    tags: ['TypeScript', '前端', '类型系统'],
    category: '技术'
  },
  {
    id: '4',
    title: '现代CSS布局技巧',
    excerpt: '掌握Flexbox和Grid布局，构建响应式、灵活的现代网页布局。',
    content: `
# 现代CSS布局技巧

CSS布局技术已经发展得非常成熟，Flexbox和Grid是现代布局的两大支柱。

## Flexbox布局

Flexbox适合一维布局，无论是水平还是垂直方向：

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## Grid布局

Grid适合二维布局，可以同时控制行和列：

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
\`\`\`

## 响应式设计

结合媒体查询实现响应式布局：

\`\`\`css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`

## 结语

掌握现代CSS布局，可以大大提高开发效率和页面质量。
    `,
    date: '2024-02-28',
    readTime: 4,
    tags: ['CSS', '布局', '前端'],
    category: '技术'
  },
  {
    id: '5',
    title: '写作与思考',
    excerpt: '关于写作的一些个人感悟，如何通过文字表达思想，记录成长。',
    content: `
# 写作与思考

写作是一种思考的方式。通过文字，我们能够更清晰地认识自己，理解世界。

## 写作的意义

1. **整理思绪** - 写作迫使我们组织零散的想法
2. **记录成长** - 文字是时间最好的见证
3. **分享价值** - 好的内容能够帮助他人

## 如何开始写作

- 从小事开始，不必追求宏大叙事
- 保持真实，写自己真正了解的内容
- 持续输出，养成写作习惯

## 结语

写作是一场与自己的对话，也是与世界交流的桥梁。
    `,
    date: '2024-02-20',
    readTime: 3,
    tags: ['随笔', '写作', '思考'],
    category: '随笔'
  },
  {
    id: '6',
    title: 'Vite构建工具深度解析',
    excerpt: '了解Vite的工作原理，为什么它比传统打包工具更快，以及如何在项目中使用。',
    content: `
# Vite构建工具深度解析

Vite是新一代前端构建工具，以其极快的开发服务器启动速度著称。

## 为什么Vite更快？

### 开发环境

Vite利用浏览器原生ES模块支持，无需打包即可启动开发服务器：

- **即时启动** - 无需等待打包
- **按需编译** - 只编译当前页面需要的模块
- **热更新** - 更新速度不随项目规模增长

### 生产环境

使用Rollup进行生产构建，优化输出：

\`\`\`javascript
// vite.config.js
export default {
  build: {
    target: 'es2015',
    outDir: 'dist',
    minify: 'terser'
  }
}
\`\`\`

## 主要特性

- 开箱即用的TypeScript支持
- CSS预处理器支持
- 插件生态系统

## 结语

Vite代表了前端构建工具的未来方向，值得每个开发者学习和使用。
    `,
    date: '2024-02-15',
    readTime: 7,
    tags: ['Vite', '构建工具', '前端'],
    category: '技术'
  }
];

export const categories: Category[] = [
  { id: '1', name: '技术', count: 4 },
  { id: '2', name: '设计', count: 1 },
  { id: '3', name: '随笔', count: 1 }
];

export const tags: Tag[] = [
  { id: '1', name: 'React', count: 1 },
  { id: '2', name: 'TypeScript', count: 1 },
  { id: '3', name: 'CSS', count: 1 },
  { id: '4', name: '前端', count: 4 },
  { id: '5', name: '设计', count: 1 },
  { id: '6', name: '极简主义', count: 1 },
  { id: '7', name: '性能优化', count: 1 },
  { id: '8', name: '布局', count: 1 },
  { id: '9', name: '构建工具', count: 1 },
  { id: '10', name: 'Vite', count: 1 },
  { id: '11', name: '随笔', count: 1 },
  { id: '12', name: '写作', count: 1 }
];

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const getPostsByCategory = (category: string): Post[] => {
  return posts.filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter(post => post.tags.includes(tag));
};
