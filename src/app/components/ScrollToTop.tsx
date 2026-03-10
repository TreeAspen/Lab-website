import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每次检测到路由路径发生变化，就强制把窗口滚动到最顶部
    window.scrollTo(0, 0);
  }, [pathname]);

  // 这个组件不需要渲染任何 UI
  return null;
}