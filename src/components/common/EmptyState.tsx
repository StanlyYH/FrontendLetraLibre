import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="common-state">
      <h2 className="common-state__title">{title}</h2>

      <p className="common-state__description">{description}</p>

      {action && <div className="common-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;