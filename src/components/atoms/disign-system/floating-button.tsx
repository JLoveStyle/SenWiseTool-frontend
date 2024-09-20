import clsx from "clsx";
import { useEffect, useState } from "react";
import { PiCursorClickFill } from "react-icons/pi";

interface Props {
  children?: React.ReactNode;
  className?: string;
  action?: Function;
  positionTop?: number;
  positionLeft?: number;
}

const FloatingButton: React.FC<Props> = ({
  children,
  className,
  action = () => {},
  positionTop = 100,
  positionLeft = 100,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [position, setPosition] = useState({
    top: positionTop,
    left: positionLeft,
  });
  const [isHovered, setIsHovered] = useState(false);

  const clampPosition = (newLeft: number, newTop: number) => {
    const maxLeft = window.innerWidth - 100;
    const maxTop = window.innerHeight - 50;
    const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const clampedTop = Math.max(0, Math.min(newTop, maxTop));
    return { left: clampedLeft, top: clampedTop };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    const buttonRect = (e.target as HTMLElement).getBoundingClientRect();
    setOffsetX(e.clientX - buttonRect.left);
    setOffsetY(e.clientY - buttonRect.top);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        top: e.clientY - offsetY,
        left: e.clientX - offsetX,
      };
      setPosition(clampPosition(newPosition.left, newPosition.top));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offsetX, offsetY]);

  const handleClick = () => {
    if (action) {
      action();
    }
  };

  return (
    <button
      className={clsx(
        "fixed p-2 shadow-lg transition-transform duration-300",
        className,
        isDragging
          ? "cursor-grabbing"
          : isHovered
          ? "cursor-pointer"
          : "cursor-grab"
      )}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children ? (
        children
      ) : (
        <>
          <sup>...</sup>
          <PiCursorClickFill />
        </>
      )}
    </button>
  );
};

export default FloatingButton;
