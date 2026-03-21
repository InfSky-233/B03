import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Post from '../pages/Post';
import About from '../pages/About';
import Categories from '../pages/Categories';
import Tags from '../pages/Tags';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/about" element={<About />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/category/:name" element={<Categories />} />
      <Route path="/tag/:name" element={<Tags />} />
    </Routes>
  );
}
