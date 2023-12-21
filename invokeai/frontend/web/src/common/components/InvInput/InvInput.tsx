import { Input } from '@chakra-ui/react';
import { useGlobalModifiersSetters } from 'common/hooks/useGlobalModifiers';
import { stopPastePropagation } from 'common/util/stopPastePropagation';
import type { KeyboardEvent } from 'react';
import { useCallback } from 'react';

import type { InvInputProps } from './types';

export const InvInput = (props: InvInputProps) => {
  const { setShift } = useGlobalModifiersSetters();
  const onKeyUpDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      setShift(e.shiftKey);
    },
    [setShift]
  );
  return (
    <Input
      onPaste={stopPastePropagation}
      onKeyUp={onKeyUpDown}
      onKeyDown={onKeyUpDown}
      {...props}
    />
  );
};
