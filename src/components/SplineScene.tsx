import { motion } from 'framer-motion';

interface SplineSceneProps {
  url: string;
  className?: string;
}

export const SplineScene = ({ url, className = '' }: SplineSceneProps) => {
  // Convert Spline URL to embed format
  const embedUrl = url.replace('prod.spline.design', 'my.spline.design/embed');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={`w-full h-full ${className}`}
    >
      <iframe
        src={embedUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Spline 3D Scene"
        loading="lazy"
      />
    </motion.div>
  );
};
