export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  coverImage?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
