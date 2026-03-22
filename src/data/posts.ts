import { Post, Category, Tag } from '../types';

const categoryList = ['技术', '设计', '随笔', '生活', '编程', '前端', '后端', '人工智能'];
const tagsList = [
  'React', 'Vue', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js',
  'Python', 'Java', 'Go', 'Rust', 'Docker', 'Kubernetes', 'AWS',
  '前端', '后端', '全栈', '架构', '性能优化', '安全', '测试',
  '设计', 'UI', 'UX', '极简主义', '响应式', '动画',
  '人工智能', '机器学习', '深度学习', '神经网络', 'NLP', '计算机视觉',
  '数据库', 'MySQL', 'MongoDB', 'Redis', 'PostgreSQL',
  'Git', 'CI/CD', 'DevOps', '微服务', 'API', 'REST', 'GraphQL',
  '生活', '随笔', '思考', '阅读', '写作', '效率', '工具'
];

const titleTemplates = [
  '深入理解{tag}的核心概念',
  '{tag}最佳实践指南',
  '从零开始学习{tag}',
  '{tag}性能优化技巧',
  '{tag}项目实战经验',
  '如何高效使用{tag}',
  '{tag}常见问题解决方案',
  '{tag}进阶教程',
  '现代{tag}开发指南',
  '{tag}架构设计模式',
  '探索{tag}的无限可能',
  '{tag}与前端开发的融合',
  '构建可扩展的{tag}应用',
  '{tag}安全最佳实践',
  '{tag}调试技巧大全',
  '提升{tag}开发效率的方法',
  '{tag}代码重构指南',
  '企业级{tag}应用开发',
  '{tag}单元测试实践',
  '{tag}微服务架构设计',
  '云原生{tag}应用部署',
  '{tag}异步编程模式',
  '{tag}状态管理方案',
  '{tag}响应式编程入门',
  '{tag}函数式编程思想',
  '{tag}设计模式应用',
  '{tag}代码质量提升',
  '{tag}团队协作实践',
  '{tag}持续集成方案',
  '{tag}监控与日志分析'
];

const excerptTemplates = [
  '本文将深入探讨{tag}的核心概念和实践方法，帮助你快速掌握这项技术。',
  '分享{tag}的实际项目经验，从入门到进阶的完整学习路径。',
  '详细介绍{tag}的工作原理和应用场景，适合各级开发者阅读。',
  '通过实际案例讲解{tag}的最佳实践，提升你的开发技能。',
  '总结{tag}开发中的常见问题和解决方案，助你避开常见陷阱。',
  '从基础到高级，全面解析{tag}的技术要点和实现细节。',
  '探索{tag}在现代开发中的应用，分享实用的技巧和经验。',
  '深入分析{tag}的设计理念和实现方式，适合有一定基础的开发者。'
];

function generatePost(id: number): Post {
  const category = categoryList[Math.floor(Math.random() * categoryList.length)];
  const tagCount = Math.floor(Math.random() * 3) + 2;
  const selectedTags: string[] = [];

  while (selectedTags.length < tagCount) {
    const tag = tagsList[Math.floor(Math.random() * tagsList.length)];
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
    }
  }

  const mainTag = selectedTags[0];
  const titleTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const title = titleTemplate.replace('{tag}', mainTag);

  const excerptTemplate = excerptTemplates[Math.floor(Math.random() * excerptTemplates.length)];
  const excerpt = excerptTemplate.replace('{tag}', mainTag);

  const startDate = new Date('2022-01-01');
  const endDate = new Date('2024-12-31');
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  const date = randomDate.toISOString().split('T')[0];

  const readTime = Math.floor(Math.random() * 12) + 3;

  return {
    id: String(id),
    title,
    excerpt,
    content: `# ${title}\n\n${excerpt}\n\n## 核心内容\n\n本文详细介绍了${mainTag}的相关知识，包括基础概念、实践方法和进阶技巧。\n\n### 主要要点\n\n1. 理解${mainTag}的基本原理\n2. 掌握${mainTag}的实践方法\n3. 学习${mainTag}的最佳实践\n\n## 总结\n\n通过本文的学习，相信你对${mainTag}有了更深入的理解。`,
    date,
    readTime,
    tags: selectedTags,
    category
  };
}

const generatedPosts: Post[] = [];
for (let i = 1; i <= 300; i++) {
  generatedPosts.push(generatePost(i));
}

generatedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const posts: Post[] = generatedPosts;

function countByCategory(): Map<string, number> {
  const counts = new Map<string, number>();
  posts.forEach(post => {
    counts.set(post.category, (counts.get(post.category) || 0) + 1);
  });
  return counts;
}

function countByTag(): Map<string, number> {
  const counts = new Map<string, number>();
  posts.forEach(post => {
    post.tags.forEach(tag => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return counts;
}

export const categories: Category[] = Array.from(countByCategory().entries())
  .map(([name, count], index) => ({
    id: String(index + 1),
    name,
    count
  }))
  .sort((a, b) => b.count - a.count);

export const tags: Tag[] = Array.from(countByTag().entries())
  .map(([name, count], index) => ({
    id: String(index + 1),
    name,
    count
  }))
  .sort((a, b) => b.count - a.count);

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const getPostsByCategory = (category: string): Post[] => {
  return posts.filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter(post => post.tags.includes(tag));
};
