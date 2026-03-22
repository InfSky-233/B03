import { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '../types';

const POSTS_PER_PAGE = 10;

function arePostsEqual(a: Post[], b: Post[]): boolean {
  if (a.length !== b.length) return false;
  if (a.length === 0 && b.length === 0) return true;
  if (a.length === 0 || b.length === 0) return false;
  return a[0].id === b[0].id && a[a.length - 1].id === b[b.length - 1].id;
}

export function useInfiniteScroll(allPosts: Post[]) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const prevPostsRef = useRef<Post[]>([]);
  const isLoadingRef = useRef(false);
  const pageRef = useRef(1);

  const loadPosts = useCallback((pageNum: number, posts: Post[]) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setLoading(true);

    setTimeout(() => {
      const end = pageNum * POSTS_PER_PAGE;
      const newPosts = posts.slice(0, end);

      setDisplayedPosts(newPosts);
      setHasMore(end < posts.length);
      setLoading(false);
      isLoadingRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    if (!arePostsEqual(prevPostsRef.current, allPosts)) {
      prevPostsRef.current = allPosts;
      pageRef.current = 1;
      setDisplayedPosts([]);
      setHasMore(true);
      if (allPosts.length > 0) {
        loadPosts(1, allPosts);
      }
    }
  }, [allPosts, loadPosts]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isLoadingRef.current) {
          pageRef.current += 1;
          loadPosts(pageRef.current, allPosts);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadPosts, allPosts]);

  return {
    displayedPosts,
    loading,
    hasMore,
    loadMoreRef,
  };
}
