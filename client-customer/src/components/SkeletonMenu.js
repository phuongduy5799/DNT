import { Skeleton } from '@nextui-org/react';

const SkeletonMenu = () => {
  return (
    <div className="skeleton-menu">
      {[1, 2, 3, 4, 5].map((index) => (
        <Skeleton key={index} width={80} height={20} color="#e0e0e0" highlightColor="#c0c0c0" />
      ))}
    </div>
  );
};

export default SkeletonMenu;