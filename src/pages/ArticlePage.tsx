import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleData {
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("Article ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle(docSnap.data() as ArticleData);
        } else {
          setError("הכתבה לא נמצאה.");
        }
      } catch (err) {
        setError("אירעה שגיאה בטעינת הכתבה.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        טוען כתבה...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">שגיאה</h2>
        <p>{error}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          חזור לעמוד הבית
        </Link>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        הכתבה המבוקשת אינה קיימת.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article>
          <div className="mb-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 ml-1" />
              חזרה לכל החדשות
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold text-right mb-3">{article.title}</h1>
          <div className="flex items-center space-x-4 space-x-reverse text-muted-foreground mb-4">
            <Badge>{article.category}</Badge>
            <span>{new Date(article.date).toLocaleDateString('he-IL')}</span>
          </div>
          <img src={article.image} alt={article.title} className="w-full rounded-lg mb-8" />
          <div 
            className="prose prose-lg max-w-none text-right" 
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\\n/g, '<br />') }} 
          />
        </article>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage; 