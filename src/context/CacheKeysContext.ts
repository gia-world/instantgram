import { createContext, useContext } from "react";

type CacheKeysValue = {
  postsKey: string;
};

export const CacheKeysContext = createContext<CacheKeysValue>({
  // 프로바이더로 감싸지 않으면 기본이 "/api/posts"
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
