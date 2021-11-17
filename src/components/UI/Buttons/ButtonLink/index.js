import React, { memo } from 'react';
import Link from 'next/link';

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link as={hrefAs} href={href} prefetch={prefetch}>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  )
);

export default memo(ButtonLink);
