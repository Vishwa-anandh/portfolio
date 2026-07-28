import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

const subtleControl =
  "apple-control inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white/70 backdrop-blur-xl hover:bg-white/[0.12] hover:text-white active:scale-[0.98]";

interface BackControlProps {
  label?: string;
  to?: string;
  fallback?: string;
  className?: string;
}

export function BackControl({
  label = "Back",
  to,
  fallback = "/",
  className,
}: BackControlProps) {
  const navigate = useNavigate();
  const content = (
    <>
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      <span>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(subtleControl, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.history.length > 2 ? navigate(-1) : navigate(fallback)
      }
      className={cn(subtleControl, className)}
    >
      {content}
    </button>
  );
}

interface PageBarProps extends BackControlProps {
  children?: ReactNode;
  navClassName?: string;
}

export function PageBar({
  children,
  navClassName,
  ...backProps
}: PageBarProps) {
  return (
    <nav
      aria-label="Page navigation"
      className={cn(
        "apple-material sticky top-0 z-50 border-x-0 border-t-0",
        navClassName,
      )}
    >
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10 xl:px-12">
        <BackControl {...backProps} />
        {children ? <div className="flex items-center gap-2">{children}</div> : null}
      </div>
    </nav>
  );
}

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export function CloseButton({
  onClick,
  className,
  label = "Close image viewer",
}: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={cn(
        "apple-control apple-material absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center p-0 text-white/75 hover:bg-white/[0.14] hover:text-white md:right-6 md:top-6",
        className,
      )}
    >
      <X aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}

interface NextProjectLinkProps {
  to: string;
  name: string;
}

export function NextProjectLink({ to, name }: NextProjectLinkProps) {
  return (
    <div className="mt-32 border-t border-white/10 pb-12 pt-16 text-center">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
        Next project
      </p>
      <Link
        to={to}
        className="apple-control group inline-flex items-center gap-3 px-5 text-3xl font-semibold tracking-[-0.035em] text-white hover:bg-white/[0.06] hover:text-[#64D2FF] md:text-5xl"
      >
        <span>{name}</span>
        <ArrowRight
          aria-hidden="true"
          className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1 md:h-8 md:w-8"
        />
      </Link>
    </div>
  );
}
