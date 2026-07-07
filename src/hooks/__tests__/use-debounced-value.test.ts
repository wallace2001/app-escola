import { act, renderHook } from '@testing-library/react-native';

import { useDebouncedValue } from '../use-debounced-value';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('só propaga o valor depois do intervalo', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ab');
  });

  it('reinicia o timer a cada mudança', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'abc' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('abc');
  });
});
