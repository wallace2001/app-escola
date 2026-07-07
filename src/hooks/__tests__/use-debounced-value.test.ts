import { act, renderHook } from '@testing-library/react-native';

import { useDebouncedValue } from '../use-debounced-value';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('só propaga o valor depois do intervalo', async () => {
    const { result, rerender } = await renderHook<string, { value: string }>(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    );

    await rerender({ value: 'ab' });
    expect(result.current).toBe('a');

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ab');
  });

  it('reinicia o timer a cada mudança', async () => {
    const { result, rerender } = await renderHook<string, { value: string }>(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    );

    await rerender({ value: 'ab' });
    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    await rerender({ value: 'abc' });
    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('a');

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('abc');
  });
});
