import "../../theme.css";

import * as React from "react";

import resetStyles from "../../reset.module.css";
import styles from "./button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
}

const variantStyles = {
  primary: styles["variant-primary"],
  outline: styles["variant-outline"],
  ghost: styles["variant-ghost"],
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      disabled,
      variant = "primary",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={[resetStyles.base, styles.button, variantStyles[variant], className]
          .filter(Boolean)
          .join(" ")}
        disabled={isLoading || disabled}
        {...props}
      >
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span className={styles.text}>{children}</span>
        {isLoading ? (
          <span className={styles.iconRight}>
            <Spinner />
          </span>
        ) : (
          rightIcon && <span className={styles.iconRight}>{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

function Spinner() {
  return (
    <svg
      className={styles.spinner}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
    >
      <circle
        className={styles.spinnerTrack}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={styles.spinnerHead}
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
