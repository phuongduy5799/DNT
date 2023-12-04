import Skeleton from 'react-loading-skeleton';

export default function CarouselSkeleton() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Skeleton height={'100%'} />
    </div>
  );
}