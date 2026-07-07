import { ApiError, buildQuery, getErrorMessage, http } from '../http';

function jsonResponse(status: number, body?: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json:
      body === undefined
        ? jest.fn().mockRejectedValue(new Error('sem corpo'))
        : jest.fn().mockResolvedValue(body),
  };
}

describe('buildQuery', () => {
  it('retorna string vazia quando não há parâmetros válidos', () => {
    expect(buildQuery({})).toBe('');
    expect(buildQuery({ q: '', shift: undefined })).toBe('');
  });

  it('monta a query string com os valores codificados', () => {
    expect(buildQuery({ q: 'escola azul', schoolId: '2' })).toBe('?q=escola%20azul&schoolId=2');
  });
});

describe('http', () => {
  const originalFetch = globalThis.fetch;
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  it('devolve o payload em respostas de sucesso', async () => {
    fetchMock.mockResolvedValue(jsonResponse(200, [{ id: '1' }]));

    await expect(http.get('/schools')).resolves.toEqual([{ id: '1' }]);
  });

  it('lança ApiError com a mensagem enviada pelo servidor', async () => {
    fetchMock.mockResolvedValue(jsonResponse(422, { message: 'Informe o nome da escola' }));

    await expect(http.post('/schools', {})).rejects.toMatchObject({
      name: 'ApiError',
      status: 422,
      message: 'Informe o nome da escola',
    });
  });

  it('usa mensagem genérica quando o corpo do erro não é legível', async () => {
    fetchMock.mockResolvedValue(jsonResponse(500));

    await expect(http.get('/schools')).rejects.toMatchObject({ status: 500 });
  });

  it('converte falha de rede em ApiError de conexão', async () => {
    fetchMock.mockRejectedValue(new TypeError('Network request failed'));

    await expect(http.get('/schools')).rejects.toMatchObject({ status: 0 });
  });

  it('aceita respostas 204 sem corpo', async () => {
    fetchMock.mockResolvedValue(jsonResponse(204));

    await expect(http.delete('/schools/1')).resolves.toBeNull();
  });
});

describe('getErrorMessage', () => {
  it('usa a mensagem de ApiError', () => {
    expect(getErrorMessage(new ApiError('Escola não encontrada.', 404))).toBe(
      'Escola não encontrada.',
    );
  });

  it('cai na mensagem padrão para erros desconhecidos', () => {
    expect(getErrorMessage(new Error('boom'))).toBe(
      'Algo deu errado. Tente novamente em instantes.',
    );
  });
});
