import { useEffect, useRef, useState } from 'react';

const Advantage = (props: {id: number, title: string, timer: number}) => {
  const [isActive, setIsActive] = useState(false);
  const advantageItemRef = useRef<HTMLDivElement>(null);

  const setAdvantageItemAnimation = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    function setAnimation() {
        setIsActive(entry.isIntersecting);
    }
    if (entry.isIntersecting) {
        setTimeout(setAnimation, props.timer);
    } else {
        setAnimation();
    }
  }

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(setAdvantageItemAnimation);
    if (advantageItemRef.current) {
      observer.observe(advantageItemRef.current);
      observerRefValue = advantageItemRef.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    }
  }, [advantageItemRef]);

  return (
    <div className={`advantages__item item_${props.id}${isActive ? ' advantages__item_active' : ''}`}
    onClick={() => setIsActive((prev) => !prev)} ref={advantageItemRef}>
        <p>{isActive ? props.title : '#' + props.id}</p>
    </div>
  )

}

export default Advantage;