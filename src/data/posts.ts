import { Post, Category, Tag } from '../types';

const codeExamples = {
  React: `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
  Vue: `<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

watch(count, (newCount) => {
  document.title = \`Count: \${newCount}\`;
});
</script>`,
  TypeScript: `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

function filterByRole(users: User[], role: User['role']): User[] {
  return users.filter(user => user.role === role);
}`,
  JavaScript: `// Async/Await Pattern
async function processData(urls) {
  try {
    const responses = await Promise.all(
      urls.map(url => fetch(url))
    );
    const data = await Promise.all(
      responses.map(res => res.json())
    );
    return data.flat();
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}`,
  Python: `from typing import List, Optional
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email: str
    
class UserService:
    def __init__(self):
        self.users: List[User] = []
    
    def get_user(self, user_id: int) -> Optional[User]:
        return next(
            (u for u in self.users if u.id == user_id),
            None
        )
    
    def add_user(self, user: User) -> None:
        self.users.append(user)`,
  Node: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
  CSS: `.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: var(--card-bg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
}`,
  Docker: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "server.js"]`,
  Go: `package main

import (
    "encoding/json"
    "net/http"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func getUsers(w http.ResponseWriter, r *http.Request) {
    users := []User{
        {ID: 1, Name: "Alice", Email: "alice@example.com"},
        {ID: 2, Name: "Bob", Email: "bob@example.com"},
    }
    json.NewEncoder(w).Encode(users)
}

func main() {
    http.HandleFunc("/users", getUsers)
    http.ListenAndServe(":8080", nil)
}`,
  Rust: `use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    id: u32,
    name: String,
    email: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let user = User {
        id: 1,
        name: "Alice".to_string(),
        email: "alice@example.com".to_string(),
    };
    
    let json = serde_json::to_string(&user)?;
    println!("{}", json);
    
    Ok(())
}`,
  Java: `public class UserService {
    private final UserRepository repository;
    
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
    
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }
    
    public List<User> findAll() {
        return repository.findAll();
    }
    
    public User save(User user) {
        return repository.save(user);
    }
}`,
  Kubernetes: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: web-app:latest
        ports:
        - containerPort: 8080`,
  MySQL: `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING order_count > 0
ORDER BY order_count DESC;`,
  MongoDB: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Aggregation pipeline
const result = await User.aggregate([
  { $match: { createdAt: { $gte: new Date('2024-01-01') } } },
  { $group: { _id: '$name', count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);`,
  Redis: `# String operations
SET user:1:name "Alice"
GET user:1:name

# Hash operations
HSET user:1 name "Alice" email "alice@example.com"
HGETALL user:1

# List operations
LPUSH notifications "New message"
RPOP notifications

# Sorted set for leaderboard
ZADD leaderboard 100 "player1"
ZREVRANGE leaderboard 0 9 WITHSCORES`,
  GraphQL: `type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}`,
  '机器学习': `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 准备数据
X = np.random.rand(1000, 10)
y = np.random.randint(0, 2, 1000)

# 分割数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 训练模型
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 预测
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2f}")`,
  '深度学习': `import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )
    
    def forward(self, x):
        return self.layers(x)

model = NeuralNetwork()
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())`,
  Git: `# 分支操作
git checkout -b feature/new-feature
git push origin feature/new-feature

# 合并分支
git checkout main
git merge feature/new-feature

# 交互式变基
git rebase -i HEAD~3

# 撤销操作
git reset --soft HEAD~1
git checkout -- .`,
  'API': `// RESTful API Design
GET    /api/users          # 获取用户列表
GET    /api/users/:id      # 获取单个用户
POST   /api/users          # 创建用户
PUT    /api/users/:id      # 更新用户
DELETE /api/users/:id      # 删除用户

// Response Format
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice"
  },
  "meta": {
    "page": 1,
    "total": 100
  }
}`,
  '微服务': `# docker-compose.yml
version: '3.8'
services:
  api-gateway:
    build: ./gateway
    ports:
      - "8080:8080"
    depends_on:
      - user-service
      - order-service
  
  user-service:
    build: ./user-service
    environment:
      - DB_HOST=mongodb
  
  order-service:
    build: ./order-service
    environment:
      - DB_HOST=postgresql`,
  '性能优化': `// 代码分割
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// 虚拟列表
import { FixedSizeList } from 'react-window';

// 图片懒加载
<img loading="lazy" src="image.jpg" alt="description" />

// 缓存策略
const cache = new Map();
function memoizedFetch(url) {
  if (cache.has(url)) return cache.get(url);
  const promise = fetch(url).then(r => r.json());
  cache.set(url, promise);
  return promise;
}`,
  '安全': `// XSS 防护
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// CSRF Token
const token = document.querySelector('meta[name="csrf-token"]').content;

// 密码哈希
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10);

// SQL 注入防护
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);`,
  '测试': `import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
  
  test('increments count on click', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});`,
};

const flowcharts = [
  `\`\`\`
用户请求 → 负载均衡 → API网关 → 微服务
                            ↓
                        数据库集群
                            ↓
                        缓存层(Redis)
\`\`\``,
  `\`\`\`
前端应用
    ├── 组件层
    │   ├── UI组件
    │   └── 业务组件
    ├── 状态管理
    │   ├── 全局状态
    │   └── 局部状态
    └── 数据层
        ├── API调用
        └── 本地缓存
\`\`\``,
  `\`\`\`
CI/CD流程:
代码提交 → 自动构建 → 单元测试 → 集成测试
                              ↓
                          代码审查
                              ↓
                          部署 staging
                              ↓
                          部署 production
\`\`\``,
  `\`\`\`
数据库设计:
users (用户表)
├── id: INT PK
├── name: VARCHAR(100)
├── email: VARCHAR(255)
└── created_at: TIMESTAMP

posts (文章表)
├── id: INT PK
├── user_id: INT FK
├── title: VARCHAR(200)
└── content: TEXT
\`\`\``,
  `\`\`\`
状态流转:
[初始状态] --登录--> [已认证]
[已认证] --获取数据--> [加载中]
[加载中] --成功--> [成功]
[加载中] --失败--> [错误]
\`\`\``,
  `\`\`\`
请求处理流程:
Client → Middleware → Controller → Service → Repository → Database
           ↓              ↓            ↓
        认证/授权      参数验证     业务逻辑
\`\`\``,
  `\`\`\`
组件生命周期:
Mount → Update → Unmount
  ↓        ↓        ↓
初始化   重渲染   清理资源
\`\`\``,
  `\`\`\`
缓存策略:
请求 → 检查缓存 → 命中? → 返回缓存
              ↓否
          请求数据库
              ↓
          更新缓存
              ↓
          返回数据
\`\`\``,
];

const images = [
  'https://picsum.photos/seed/dev1/800/450',
  'https://picsum.photos/seed/dev2/800/450',
  'https://picsum.photos/seed/dev3/800/450',
  'https://picsum.photos/seed/dev4/800/450',
  'https://picsum.photos/seed/dev5/800/450',
  'https://picsum.photos/seed/dev6/800/450',
  'https://picsum.photos/seed/dev7/800/450',
  'https://picsum.photos/seed/dev8/800/450',
  'https://picsum.photos/seed/dev9/800/450',
  'https://picsum.photos/seed/dev10/800/450',
];

const articleTemplates = [
  {
    category: '前端',
    tags: ['React', 'Vue', 'TypeScript', 'JavaScript', 'CSS', '前端'],
    templates: [
      {
        title: '深入理解{tag}的核心原理与最佳实践',
        sections: ['概述', '核心概念', '实现原理', '最佳实践', '性能优化', '常见问题', '总结']
      },
      {
        title: '{tag}项目实战：从零构建企业级应用',
        sections: ['项目背景', '技术选型', '架构设计', '核心功能实现', '测试策略', '部署方案', '经验总结']
      },
      {
        title: '{tag}性能优化完全指南',
        sections: ['性能瓶颈分析', '优化策略', '代码层面优化', '构建优化', '运行时优化', '监控方案', '效果评估']
      }
    ]
  },
  {
    category: '后端',
    tags: ['Node.js', 'Python', 'Go', 'Rust', 'Java', '后端', 'API', '微服务'],
    templates: [
      {
        title: '构建高性能{tag}服务',
        sections: ['架构设计', '技术实现', '并发处理', '数据存储', '缓存策略', '监控告警', '扩展方案']
      },
      {
        title: '{tag}微服务架构实践',
        sections: ['服务拆分', '通信机制', '服务发现', '配置管理', '链路追踪', '容错处理', '部署运维']
      }
    ]
  },
  {
    category: '人工智能',
    tags: ['人工智能', '机器学习', '深度学习', '神经网络', 'NLP'],
    templates: [
      {
        title: '{tag}入门到精通',
        sections: ['基础概念', '数学基础', '算法原理', '模型训练', '评估优化', '实际应用', '前沿进展']
      },
      {
        title: '实战{tag}：解决真实世界问题',
        sections: ['问题定义', '数据准备', '特征工程', '模型选择', '训练调优', '模型部署', '效果评估']
      }
    ]
  },
  {
    category: '技术',
    tags: ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'DevOps', '数据库'],
    templates: [
      {
        title: '{tag}完全指南',
        sections: ['基础概念', '安装配置', '核心功能', '高级特性', '最佳实践', '故障排查', '生产部署']
      },
      {
        title: '企业级{tag}实践',
        sections: ['需求分析', '方案设计', '实施步骤', '性能调优', '安全加固', '运维监控', '经验总结']
      }
    ]
  }
];

function generateContent(title: string, sections: string[], mainTag: string): string {
  const codeExample = codeExamples[mainTag as keyof typeof codeExamples] || codeExamples['JavaScript'];
  const flowchart = flowcharts[Math.floor(Math.random() * flowcharts.length)];
  const image = images[Math.floor(Math.random() * images.length)];

  let content = `# ${title}\n\n`;
  content += `本文将详细介绍${mainTag}相关的核心概念、实践方法和最佳实践，帮助开发者快速掌握这项技术。\n\n`;

  content += `![${mainTag}相关图片](${image})\n\n`;

  sections.forEach((section, index) => {
    content += `## ${section}\n\n`;

    switch (section) {
      case '概述':
      case '项目背景':
      case '基础概念':
        content += `${mainTag}是现代软件开发中不可或缺的技术之一。`;
        content += `它提供了强大的功能和灵活的架构设计，能够满足各种复杂的业务需求。\n\n`;
        content += `**主要特点：**\n\n`;
        content += `- 高性能：经过优化的运行时环境\n`;
        content += `- 易用性：简洁的API设计\n`;
        content += `- 可扩展：模块化的架构支持\n`;
        content += `- 社区活跃：丰富的生态系统\n\n`;
        break;

      case '核心概念':
      case '技术选型':
      case '数学基础':
        content += `理解以下核心概念对于掌握${mainTag}至关重要：\n\n`;
        content += `**1. 组件化思想**\n\n`;
        content += `组件是构建应用的基本单元，每个组件负责特定的功能模块。\n\n`;
        content += `**2. 状态管理**\n\n`;
        content += `合理的状态管理能够使应用更加可预测和易于调试。\n\n`;
        content += `**3. 数据流**\n\n`;
        content += `单向数据流确保了数据的可追溯性和应用的稳定性。\n\n`;
        break;

      case '实现原理':
      case '架构设计':
      case '算法原理':
        content += `以下是${mainTag}的核心架构设计：\n\n`;
        content += `${flowchart}\n\n`;
        content += `这种架构设计确保了系统的可维护性和可扩展性。\n\n`;
        break;

      case '最佳实践':
      case '核心功能实现':
      case '模型训练':
        content += `以下是${mainTag}的核心代码实现：\n\n`;
        content += `\`\`\`${mainTag.toLowerCase()}\n${codeExample}\n\`\`\`\n\n`;
        content += `**代码说明：**\n\n`;
        content += `- 使用了现代的语法特性\n`;
        content += `- 遵循了最佳实践原则\n`;
        content += `- 注重代码的可读性和可维护性\n\n`;
        break;

      case '性能优化':
      case '并发处理':
      case '评估优化':
        content += `性能优化是${mainTag}应用的关键环节，以下是几个重要的优化方向：\n\n`;
        content += `**1. 代码层面优化**\n\n`;
        content += `- 减少不必要的计算\n`;
        content += `- 使用缓存策略\n`;
        content += `- 优化循环和递归\n\n`;
        content += `**2. 构建优化**\n\n`;
        content += `- 代码分割\n`;
        content += `- Tree Shaking\n`;
        content += `- 压缩混淆\n\n`;
        content += `**3. 运行时优化**\n\n`;
        content += `- 懒加载\n`;
        content += `- 虚拟列表\n`;
        content += `- 防抖节流\n\n`;
        break;

      case '常见问题':
      case '测试策略':
      case '特征工程':
        content += `在使用${mainTag}过程中，开发者可能会遇到以下常见问题：\n\n`;
        content += `**问题1：性能瓶颈**\n\n`;
        content += `解决方案：使用性能分析工具定位问题，针对性优化。\n\n`;
        content += `**问题2：内存泄漏**\n\n`;
        content += `解决方案：定期检查内存使用情况，及时清理不需要的引用。\n\n`;
        content += `**问题3：兼容性问题**\n\n`;
        content += `解决方案：使用polyfill或降级方案处理不同环境的差异。\n\n`;
        break;

      case '总结':
      case '经验总结':
      case '效果评估':
        content += `通过本文的学习，我们深入了解了${mainTag}的核心概念和实践方法。\n\n`;
        content += `**关键要点回顾：**\n\n`;
        content += `1. 理解${mainTag}的基本原理是高效使用的前提\n`;
        content += `2. 遵循最佳实践能够避免常见陷阱\n`;
        content += `3. 性能优化需要持续关注和改进\n`;
        content += `4. 社区资源是学习和解决问题的重要途径\n\n`;
        content += `希望本文能够帮助你在${mainTag}的学习和使用中取得更好的成果！\n\n`;
        break;

      default:
        content += `在这一部分，我们将深入探讨${section}相关的内容。\n\n`;
        content += `这对于全面理解${mainTag}非常重要。\n\n`;
    }
  });

  return content;
}

function generatePost(id: number): Post {
  const categoryConfig = articleTemplates[Math.floor(Math.random() * articleTemplates.length)];
  const category = categoryConfig.category;
  const tagCount = Math.floor(Math.random() * 3) + 2;
  const selectedTags: string[] = [];

  const availableTags = categoryConfig.tags;
  while (selectedTags.length < tagCount && selectedTags.length < availableTags.length) {
    const tag = availableTags[Math.floor(Math.random() * availableTags.length)];
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
    }
  }

  const mainTag = selectedTags[0];
  const template = categoryConfig.templates[Math.floor(Math.random() * categoryConfig.templates.length)];
  const title = template.title.replace('{tag}', mainTag);
  const content = generateContent(title, template.sections, mainTag);

  const excerpt = `本文深入探讨${mainTag}的核心概念和实践方法，涵盖${template.sections.slice(0, 3).join('、')}等重要内容，适合各级开发者阅读学习。`;

  const startDate = new Date('2022-01-01');
  const endDate = new Date('2025-03-01');
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  const date = randomDate.toISOString().split('T')[0];

  const readTime = Math.floor(Math.random() * 15) + 5;

  return {
    id: String(id),
    title,
    excerpt,
    content,
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
