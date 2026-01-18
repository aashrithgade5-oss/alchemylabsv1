import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  url: string;
  className?: string;
}

export const SplineScene = ({ url, className = '' }: SplineSceneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={`w-full h-full ${className}`}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-alchemy-red/30 border-t-alchemy-red animate-spin" />
          </div>
        }
      >
        <Spline scene={url} />
      </Suspense>
    </motion.div>
  );
};
