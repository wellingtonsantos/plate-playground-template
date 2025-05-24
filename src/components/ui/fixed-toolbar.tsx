'use client';

import { cn } from '@/lib/utils';

import { Toolbar } from './toolbar';

// export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
//   return (
//     <Toolbar
//       {...props}
//       className={cn(
//         'sticky top-0 left-0 z-50 scrollbar-hide w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 p-1 backdrop-blur-sm supports-backdrop-blur:bg-background/60',
//         props.className
//       )}
//     />
//   );
// }

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50',
        'sticky top-0 left-0 z-50'
      )}
    >
      <Toolbar
        {...props}
        className={cn(
          'w-max min-w-full flex justify-start gap-2 px-2 py-1 rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur-sm supports-backdrop-blur:bg-background/60',
          props.className
        )}
      />
    </div>
  );
}
